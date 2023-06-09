import connectToMongo from "@/middleware/mongoose"
import Order from "@/models/Order"
const http = require('https');

const handler = async (req, res) => {
    console.log(req.body.order_id);
    const requestAsync = async () => {
        const options = {
            method: 'GET',
            hostname: 'sandbox.cashfree.com',
            port: 443,
            path: `/pg/orders/${req.body.order_id}/payments`,
            headers: {
                accept: 'application/json',
                'x-client-id': 'TEST37951548816bac9aacd8f3e225515973',
                'x-client-secret': 'TESTb297328882064fe5a756275621b6df0b603b5c0f',
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
                    console.log("Response: ", response);
                });
            });
            // req.on('error', reject);
            // console.log(post_data);
            // req.write(post_data)
            req.end();
        });
    }

    let myr = await requestAsync()
    res.status(200).json(myr)
    console.log(myr)
}

export default connectToMongo(handler)