import connectToMongo from "@/middleware/mongoose"
const http = require('https');

const handler = async (req, res) => {
    const SKEY = process.env.CFTEST_SECRETKEY;
    const AID = process.env.NEXT_PUBLIC_CFTEST_APPID;
    console.log(req.body.order_id);
    const requestAsync = async () => {
        const options = {
            method: 'GET',
            hostname: 'sandbox.cashfree.com',
            port: 443,
            path: `/pg/orders/${req.body.order_id}/payments`,
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