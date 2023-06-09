import connectToMongo from "@/middleware/mongoose"
import Order from "@/models/Order"
import jsonwebtoken from "jsonwebtoken"

const handler = async (req, res) => {
    const token = req.body.token;
    const data = jsonwebtoken.verify(JSON.parse(token), process.env.JWT_SECRET);
    let orders = await Order.find({email: data.email, status: 'Transaction Successful'})
    res.status(200).json({orders})
}

export default connectToMongo(handler)