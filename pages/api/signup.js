import User from "@/models/User";
import connectToMongo from "@/middleware/mongoose";
let CryptoJS = require("crypto-js")

const handler = async (req, res) => {
    if (req.method == "POST") {
        const { username, name , email, usertype } = req.body;
        if(usertype !== "Admin"){
            let u = new User({username, name, email, password: CryptoJS.AES.encrypt(JSON.stringify(req.body.password), process.env.AES_SECRET).toString()});
                await u.save();
            res.status(200).json({ Success: "Success" });
        }
        else{
            let u = new User({usertype, name, email, password: CryptoJS.AES.encrypt(JSON.stringify(req.body.password), process.env.AES_SECRET).toString()});
                await u.save();
            res.status(200).json({ Success: "Success" });
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" });
    }
}

export default connectToMongo(handler);