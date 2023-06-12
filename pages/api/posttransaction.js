import connectToMongo from "@/middleware/mongoose"
import Order from "@/models/Order"
import Product from "@/models/Product";
const http = require('https');
// const { Payouts } = require('@cashfreepayments/cashfree-sdk')

const handler = async (req, res) => {
    // const BASE_URL = process.env.NEXT_PUBLIC_HOST;
    let order;
    const { order_id } = req.query;
    // const data = { order_id };
    console.log(order_id);


    const SKEY = process.env.CFTEST_SECRETKEY;
    const AID = process.env.NEXT_PUBLIC_CFTEST_APPID;
    // console.log(req.body.order_id);
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
                    console.log(resolve(JSON.parse(response)));
                    console.log("Response:", response);
                });
            });
            // req.on('error', reject);
            // console.log(post_data);
            // req.write(post_data)
            req.end();
        });
    }

    let myr = await requestAsync()
    // res.status(200).json(myr)
    console.log(myr)



    // let a = await fetch(`${BASE_URL}/api/getPayment`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data)
    // })




    const getPaymentDetails = myr;
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
   
    // Redirect user to the order confirmation page
    // if (getPaymentDetails) {
    // }
}

export default connectToMongo(handler)




// import connectToMongo from "@/middleware/mongoose"
// import Order from "@/models/Order"
// import Product from "@/models/Product";
// // const { Payouts } = require('@cashfreepayments/cashfree-sdk')

// const handler = async (req, res) => {
//     const BASE_URL = process.env.NEXT_PUBLIC_HOST;
//     let order;
//     const { order_id } = req.query;
//     const data = { order_id };
//     console.log(order_id);
//     let a = await fetch(`${BASE_URL}/api/getPayment`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data)
//     })
//     const getPaymentDetails = await a.json();
//     console.log("body : " ,getPaymentDetails)
//     console.log(typeof getPaymentDetails[0].payment_status)
//     if(getPaymentDetails[0].payment_status == 'SUCCESS'){
//         order = await Order.findOneAndUpdate({orderId: order_id},{status: getPaymentDetails[0].payment_message, paymentInfo: getPaymentDetails[0], paymentId: getPaymentDetails[0].cf_payment_id});
//         let products = order.products;
//         for( let slug in products){
//             await Product.findOneAndUpdate({slug: slug}, {$inc: {"availaibleQty": - products[slug].qty }})
//         }
//         await res.redirect(`/order?id=${order._id}&clearCart=1`, 200);
//     }
//     else if(getPaymentDetails[0].payment_status == 'FAILED'){
//     order = await Order.findOneAndUpdate({orderId: order_id},{status: getPaymentDetails[0].payment_message, paymentInfo: getPaymentDetails[0], paymentId: getPaymentDetails[0].cf_payment_id});
//     await res.redirect('/fail?id=' + order._id,200);
//     }
   
//     // Redirect user to the order confirmation page
//     // if (getPaymentDetails) {
//     // }
// }

// export default connectToMongo(handler)