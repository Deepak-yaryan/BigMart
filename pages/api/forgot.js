import connectToMongo from "@/middleware/mongoose";
import Forgot from "@/models/Forgot";
import User from "@/models/User";
import randomString from "randomstring";
import nodeMailer from 'nodemailer'
let CryptoJS = require("crypto-js")

const handler = async (req, res) => {
    // Check if user is exist in the Database
    const mail = req.body.email;
    let checkUser = await User.findOne({ "email": mail })
    if (checkUser) {
        // Send an Email to the user
        let token = randomString.generate();
        if (req.body.sendMail) {
            let forgot = new Forgot({
                email: req.body.email,
                token: token,
            })
            await forgot.save();
            let emailMsg = `We have sent you this email in response to your request to reset your password on Codeswear.com
            
            To reset your password, please follow the link below:
            
            <a href="${process.env.NEXT_PUBLIC_HOST}/forgot?token=${token}&email=${req.body.email}">Click here to reset your password</a>
            
            <br></br>
            
            We recommend that you keep secure and not share it with anyone. if you feel your password has been compromised, you can change it by going to your My Account Page and change your password.
            
            <br></br>`

            const transporter = nodeMailer.createTransport({
                host:'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: process.env.emailUser,
                    pass: process.env.emailPassword
                }
            })

            const mailOptions = {
                from: process.env.emailUser,
                to: req.body.email,
                subject: 'For reset of Password',
                html: emailMsg
            }
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('error: ', error)
                }
                else {
                    console.log('Mail has been sent: ', info.response);
                }
            })
            res.status(200).json({ success: true });
        }

        else {
            // Reset User password
            try {
                const receivedToken = req.body.token;
                const getToken = await Forgot.findOne({ token: receivedToken });
                if (getToken) {
                    const password= req.body.password
                    const newPassword = CryptoJS.AES.encrypt(JSON.stringify(password), process.env.AES_SECRET).toString()
                    await User.findOneAndUpdate({ email: getToken.email }, {$set:{ password: newPassword }},{new:true});
                    await Forgot.findOneAndDelete({ email: getToken.email });
                    res.status(200).json({ success: true});
                }
                else{
                    res.status(200).json({ success: true, msg: "This link has been expired" });
                }
            } catch (error) {
                res.status(400).json({success: false, msg: error})
            }
        }
    }

    else {
        res.status(200).json({ success: false, 'error': 'Your are not register with us. Please Signup and than Login' });
    }
}

export default connectToMongo(handler);