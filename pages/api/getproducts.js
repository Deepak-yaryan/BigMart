import Product from "@/models/Product";
import connectToMongo from "@/middleware/mongoose";

const handler = async (req,res)=> {
    let products = await Product.find();
    let tshirts = {}
    for (let item of products) {
        if(item.title in tshirts){
            if(!tshirts[item.title].color.includes(item.color) && item.availaibleQty > 0){
                tshirts[item.title].color.push(item.color);
            }
            if(!tshirts[item.title].size.includes(item.size) && item.availaibleQty > 0){
                tshirts[item.title].size.push(item.size);
            }
        }
        else{
            tshirts[item.title] = JSON.parse(JSON.stringify(item));
            if(item.availaibleQty > 0){
                tshirts[item.title].color = [item.color];
                tshirts[item.title].size = [item.size];
            }
        }
    }
    res.status(200).json({tshirts});
}

export default connectToMongo(handler);