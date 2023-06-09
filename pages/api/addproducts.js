import Product from "@/models/Product";
import connectToMongo from "@/middleware/mongoose";

const handler = async (req, res) => {
    if (req.method == "POST") {
        for (let i = 0; i < req.body.length; i++) {
            let p = new Product({
                title: req.body[i].title,
                slug: req.body[i].slug,
                desc: req.body[i].desc,
                img: req.body[i].img,
                category: req.body[i].category,
                size: req.body[i].size,
                color: req.body[i].color,
                price: JSON.parse(req.body[i].price),
                availaibleQty: JSON.parse(req.body[i].availaibleQty)
            })
            await p.save();
        }
        res.status(200).json({ success: true, msg: "Product is Added" });
    }
    else {
        res.status(400).json({ error: "This method is not allowed" });
    }
}

export default connectToMongo(handler);