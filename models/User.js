const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    usertype: {type: String, unique: true},
    username: {type: String, unique: true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: String, default: ''},
    pincode: {type: String, default: ''},
    phone: {type: String, default: ''},
},{timestamps: true});

export default mongoose.models.User || mongoose.model("User", UserSchema);
// mongoose.models = {}
// export default mongoose.model("Order", UserSchema);