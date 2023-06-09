import User from "@/models/User";
import connectToMongo from "@/middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"

const handler = async (req, res) => {
    if (req.method == "POST") {
        const token = req.body.token;
        const user = jsonwebtoken.verify(JSON.parse(token), process.env.JWT_SECRET);
        await User.findOneAndUpdate({email: user.email}, {name: req.body.name, address: req.body.address, pincode: req.body.pincode, phone: req.body.phone});
        // const { name, email, address, pincode, phone } = dbuser
        // res.status(200).json({ name, email, address, pincode, phone })
        res.status(200).json({ success: true })
    }
    else {
        res.status(400).json({ error: "error" })
    }
}

export default connectToMongo(handler)