const mongoose = require('mongoose')

const ForgotSchema = new mongoose.Schema({
    // userid: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    token: {type: String, required: true, unique: true},
},{timestamps: true});

export default mongoose.models.Forgot || mongoose.model("Forgot", ForgotSchema);
// mongoose.models = {}
// export default mongoose.model("Order", UserSchema);