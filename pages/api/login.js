import User from "@/models/User";
import connectToMongo from "@/middleware/mongoose";
let CryptoJS = require("crypto-js")
let jwt = require("jsonwebtoken")

const handler = async (req, res) => {
    if (req.method == "POST") {
        console.log(req.body);
        let user = await User.findOne({ "email": req.body.email })
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
        let decryptedPass = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        if (user) {
            if (req.body.email == user.email && req.body.password == decryptedPass) {
                let token = jwt.sign({ email:user.email ,name: user.name },process.env.JWT_SECRET, {expiresIn: "2d"});
                res.status(200).json( {Success : true, token: JSON.stringify(token)} );
                console.log(token);
            }
            else{
                res.status(404).json({ Success: false, error: "Invalid Credentials" });
            }
        }
    } else {
        res.status(400).json({ Success: false, error: "This method is not allowed" });
    }
}

export default connectToMongo(handler);