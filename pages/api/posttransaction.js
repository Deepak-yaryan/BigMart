import connectToMongo from "@/middleware/mongoose"
import Order from "@/models/Order"
import Product from "@/models/Product";
// const { Payouts } = require('@cashfreepayments/cashfree-sdk')

const handler = async (req, res) => {
    let order;
    const { order_id } = req.query;
    const data = { order_id };
    console.log(order_id);
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getPayment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const getPaymentDetails = await a.json();
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