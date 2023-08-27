const mongoose=require("mongoose");
const connectDb=async()=>{
    try{
        const connect=await mongoose.connect("mongodb://localhost:27017/contacts-backend");
        console.log("Database Connected");
    }
    catch(err)
    {
        console.log(err);
        process.exit(1);
    }
}
module.exports=connectDb;