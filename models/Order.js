const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    email: {type: String, required: true},
    orderId: {type: String, required: true},
    paymentInfo: {type: Object, default: {}, required: true},
    products: {type: Object, default: {} ,required: true},
    address: {type: String, required: true},
    name: {type: String, required: true},
    username: {type: String, required: true},
    pincode: {type: String, required: true},
    phone: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    paymentId: {type: String, default: ''},
    amount: {type: Number, required: true},
    status: {type: String, default: 'Initiated', required: true},
    deliveryStatus: {type: String, default: 'Unshipped', required: true}
},{timestamps: true});

// export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
mongoose.models = {}
export default mongoose.model("Order", OrderSchema);
