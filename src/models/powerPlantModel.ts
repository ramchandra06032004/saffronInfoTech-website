import mongoose,{Schema} from "mongoose";

const powerPlantSchema=new Schema({
    govId:{
        type:String,
        required:true,
        
    },
    nameOfOwner:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    capacity:{
        type:Number,//in KW
        required:true
    },
})

const PowerPlant=(mongoose.models.SolarPowerPlant)||(mongoose.model("SolarPowerPlant",powerPlantSchema))

export default PowerPlant;