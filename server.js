const express=require("express");
const dotenv=require("dotenv").config();
const errorHandler=require("./middleware/errorHandler")
const connectDb = require("./config/dbConnection");
const app=express();
connectDb();
const port=process.env.PROCESS || 5000;
app.use(express.json());
app.use("/api/contacts",require("./contact/contactRoutes"));
app.use("/api/users",require("./contact/userRoutes"));
app.use(errorHandler);
app.listen(port,()=>{
  console.log("port is running on" + port);
})

