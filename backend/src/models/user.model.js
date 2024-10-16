import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter the name"],
        minlength: 4,
        maxlength: 50
    },
    email:{
        type:String,
        required:[true,"please enter the email"],
        lowarcase:true,
    
    },
    image:{
       type:String,
       default:"pending"
    },
    contact:{
        type:String,
        required:[true,"please enter the contact"],
        minlength: 10,
        maxlength: 10
    },
    password:{
        type:String,
        required:[true,"please enter the password"],
        minlength: [4, 'Password must be at least 8 characters long'],
        // maxlength: [10, 'Password must not exceed 16 characters']   
    },
    otp:{
        type:String,
        default:null
    },
    isVerified:{
       type:Boolean,
       default:false

    },
    status:{
        type:Boolean,
        default:true
    },
    address:{
        type:String,
        required:[true,"address is required"],
        minlength: 4,
        maxlength: 100
    }
},{timestamps:true});


const userModel=new mongoose.model("user",userSchema);

export default userModel;