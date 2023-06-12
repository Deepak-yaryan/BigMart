import connectToMongo from '@/middleware/mongoose';
import Order from '@/models/Order';
import Product from '@/models/Product';
const crypto = require('crypto')
const http = require('https');
import pincodes from '../../pincodes.json'

const handler = async (req, res) => {
    const BASE_URL = process.env.NEXT_PUBLIC_HOST;
    const SKEY = process.env.CFTEST_SECRETKEY;
    const AID = process.env.NEXT_PUBLIC_CFTEST_APPID;
    if (req.method == "POST") {

        // check if pincode is serviceable or not
        if(!Object.keys(pincodes).includes(req.body.pincode)){
            res.status(200).json({success: false, "error": "The Pincode you have entered is not serviceable", cartClear: false})
            return
        }

        // check if cart is tempered with
        let product, sumTotal = 0;
        let cart =req.body.cart;
        if(req.body.subTotal <= 0){
            res.status(200).json({success: false,"error": "Cart Empty! Please build your cart and Try again!", cartClear: false});
            return
        }
        for(let item in cart){
            sumTotal += cart[item].price * cart[item].qty;
            product = await Product.findOne({slug: item});
            // check if cart items are out of stock
            if(product.availaibleQty < cart[item].qty){
                res.status(200).json({success: false,"error": "Some item in your cart went out of stock. Please Try again!", cartClear: true});
                return;
            }
            if(product.price != cart[item].price){
                res.status(200).json({success: false,"error": "The Price of Some Items in your  Cart have changed. Please Try again", cartClear: true});
                return;
            }
        }
        if(sumTotal !== req.body.subTotal){
            res.status(200).json({success: false,"error": "The Price of Some Items in your  Cart have changed. Please Try again", cartClear: true});
            return;
        }
    
    
        // check if details are valid
        if(req.body.phone.length !== 10 || !Number.isInteger(Number.parseInt(req.body.phone))){
            res.status(200).json({success: false,"error": "Please enter a valid 10 digit Phone Number", cartClear: false});
            return
        }
        console.log(Number.isInteger(Number.parseInt(req.body.pincode)))
        if(req.body.pincode.length !== 6 || !Number.isInteger(Number.parseInt(req.body.pincode))){
            res.status(200).json({success: false,"error": "Please enter a valid 6 digit Pincode", cartClear: false});
            return
        }
    console.log(req.body.city, req.body.state,req.body.pincode);
        // Initiate an order corresponding to this order id
        let order = new Order({
            email: req.body.email,
            orderId: req.body.oid,
            name: req.body.name,
            username: req.body.username,
            address: req.body.address,
            pincode: req.body.pincode,
            phone: req.body.phone,
            city: req.body.city,
            state: req.body.state,
            amount: req.body.subTotal,
            products: req.body.cart
        })
        await order.save();

        let cfParams = {}
         cfParams.body = {
            order_id: req.body.oid,
            order_amount: req.body.subTotal,
            order_currency: 'INR',
            customer_details: {
                customer_id: req.body.username,
                customer_name: req.body.name,
                customer_email: req.body.email,
                customer_phone: req.body.phone,
            },
            order_meta: {
                // notify_url: "${process.env.NEXT_PUBLIC_HOST}/api/getPayment?order_id={order_id}",
                return_url: `${BASE_URL}/api/posttransaction/?order_id={order_id}`,
            },
            terminal_data: {

            }
        };

        const signature = crypto.createHmac('sha256', SKEY).update(JSON.stringify(cfParams)).digest('hex');
         cfParams.head = {
            signature: signature
        }

console.log(cfParams)
        const requestAsync = async () => {
            const options = {
                method: 'POST',
                hostname: 'sandbox.cashfree.com',
                port: 443,
                path: '/pg/orders',
                headers: {
                    accept: 'application/json',
                    'x-api-version': '2022-09-01',
                    'content-type': 'application/json',
                    "x-api-version": "2022-09-01",
                    "x-client-id": AID,
                    "x-client-secret": SKEY,
                    "x-cf-signature": signature
                    // "Content-Length": post_data.length
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
                        let ress = JSON.parse(response)
                        ress.success = true
                        ress.cartClear = false
                        console.log(resolve(ress));
                        console.log("Response: ", response);
                    });
                });
                // req.on('error', reject);
                // console.log(post_data);
                req.write(JSON.stringify(cfParams.body),()=>{
                    cfParams.head
                })
                req.end();
            });
        }

        let myr = await requestAsync()
        res.status(200).json(myr)
        console.log(myr)
    }
}

export default connectToMongo(handler)