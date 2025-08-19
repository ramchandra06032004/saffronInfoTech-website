import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel",
        required:true
    },
    orderDate:{
        type:Date,
        default:Date.now
    },
    orderStatus:{
        type:String,
        default:"pending",
        enum:["pending","completed","cancelled","accepted"]
    },
    amount:{
        type:Number,
        required:true
    },
    preferedDate:{
        type:Date,
        required:true
    },
    powerPlant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SolarPowerPlant",
        required:true
    },
    type:{
        type:String,
        required:true,
        enum:["Service","Installation"]
    },
    paymentMode:{
        type:String,
        required:true,
        enum:["Online","Cash"]
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    paymentRecipt:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"PaymentRecipt"
    },
    razorpay_payment_id:{
        type:String,
        required:true
    },
    razorpay_order_id:{
        type:String,
        required:true
    }
})

const Orders=(mongoose.models.Orders)||(mongoose.model("Orders",orderSchema))

export default Orders;