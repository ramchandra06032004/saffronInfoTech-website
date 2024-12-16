import { duotoneDark } from "@react-email/components";
import mongoose from "mongoose";


//solar power plant service schema
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    countInStock:{
        type:Number,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    duration:{
        type:Number,//in months
        required:true
    }
})

const Product=(mongoose.models.Product)||(mongoose.model("Product",productSchema))
export default Product;