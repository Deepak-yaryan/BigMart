import connectToMongo from "@/middleware/mongoose"
import Order from "@/models/Order"
import Product from "@/models/Product";
const http = require('https');

const handler = async (req, res) => {
    const AID = process.env.NEXT_PUBLIC_CFTEST_APPID;
    const SKEY = process.env.CFTEST_SECRETKEY;
    let order;
    const { order_id } = req.query;

    const requestAsync = async () => {
        const options = {
            method: 'GET',
            hostname: 'sandbox.cashfree.com',
            port: 443,
            path: `/pg/orders/${order_id}/payments`,
            headers: {
                accept: 'application/json',
                'x-client-id': AID,
                'x-client-secret': SKEY,
                'x-api-version': '2022-09-01'
            }
        };
        return new Promise((resolve, reject) => {
            let response = "";
            const req = http.request(options, (res) => {
                res.on('data', (d) => {
                    response += d;
                    console.log(response);
                })
                res.on('end', () => {
                    resolve(JSON.parse(response));
                });
            });
            req.end();
        });
    }

    const getPaymentDetails = await requestAsync();
    console.log("body : " ,getPaymentDetails)
    console.log(typeof getPaymentDetails[0].payment_status)
    if(getPaymentDetails[0].payment_status == 'SUCCESS'){
        order = await Order.findOneAndUpdate({orderId: order_id},{status: getPaymentDetails[0].payment_message, paymentInfo: getPaymentDetails[0], paymentId: getPaymentDetails[0].cf_payment_id});
        let products = order.products;
        for( let slug in products){
            await Product.findOneAndUpdate({slug: slug}, {$inc: {"availaibleQty": - products[slug].qty }})
        }
        await res.redirect(`/order?id=${order._id}&clearCart=1`, 200);
    }
    else if(getPaymentDetails[0].payment_status == 'FAILED'){
    order = await Order.findOneAndUpdate({orderId: order_id},{status: getPaymentDetails[0].payment_message, paymentInfo: getPaymentDetails[0], paymentId: getPaymentDetails[0].cf_payment_id});
    await res.redirect('/fail?id=' + order._id,200);
    }
}

export default connectToMongo(handler)