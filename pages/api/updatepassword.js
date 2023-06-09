import User from "@/models/User";
import connectToMongo from "@/middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"
let CryptoJS = require("crypto-js")

const handler = async (req, res) => {
    if (req.method == "POST") {
        const token = req.body.token;
        const user = jsonwebtoken.verify(JSON.parse(token), process.env.JWT_SECRET);
        let dbuser = await User.findOne({email: user.email});
        const bytes = CryptoJS.AES.decrypt(dbuser.password, process.env.AES_SECRET);
        let decryptedPass = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        if(decryptedPass == req.body.password && req.body.npassword == req.body.cpassword){
            await User.findOneAndUpdate({email: user.email}, {password: CryptoJS.AES.encrypt(JSON.stringify(req.body.cpassword), process.env.AES_SECRET).toString()});
            res.status(200).json({ success: true });
            return
        }
        res.status(200).json({ success: false });
    }
    else {
        res.status(400).json({ error: "error" })
    }
}

export default connectToMongo(handler)