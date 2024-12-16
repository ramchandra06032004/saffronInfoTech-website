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
    }
})

const Orders=(mongoose.models.Orders)||(mongoose.model("Orders",orderSchema))

export default Orders;