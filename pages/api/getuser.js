import User from "@/models/User";
import connectToMongo from "@/middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"

const handler = async (req, res) => {
    if (req.method == "POST") {
        const token = req.body.token;
        const user = jsonwebtoken.verify(JSON.parse(token), process.env.JWT_SECRET);
        let dbuser = await User.findOne({email: user.email});
        const { name, email, address, pincode, phone, username } = dbuser
        res.status(200).json({ name, email, address, pincode, phone, username })
    }
    else {
        res.status(400).json({ error: "error" })
    }
}

export default connectToMongo(handler)