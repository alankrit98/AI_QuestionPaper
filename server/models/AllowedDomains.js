import mongoose from "mongoose";

const AllowedDomainModuleSchema = new mongoose.Schema({
    domainName :{
        type : String ,
        required : true
    },
    createdAt : {
        type : Date ,
        default : Date.now
    }
    
    
} , { timestamps: true });

export default mongoose.model('AllowedDomainModule' , AllowedDomainModuleSchema);