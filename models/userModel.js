const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please enter your name"]
    },
    email:{
       type:String,
       required:[true,"email is required"],
       unique:[true,"email id is already taken"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    }}
    ,{
       timestamps:true
    }
)
module.exports=mongoose.model("users",userSchema);