import mongoose from "mongoose";

const connectToMongo =  handler => async (req,res)=> {
    try {
        if(mongoose.connections[0].readyState){
            return handler(req,res);
        }
        else{
        await mongoose.connect(process.env.mongoURI)
        console.log("Connected to Mongo Succesfully");
        return handler(req,res);
        }
    } catch (error) {
        console.log("unable to connect to the server")
    }
}

export default connectToMongo;