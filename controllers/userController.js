//api for the logic of login 
const asyncHandler=require("express-async-handler");
const bycrpt=require("bcrypt");
const users=require("../models/userModel");
const jwt=require("jsonwebtoken");

//api to register the user
const registerUser= asyncHandler(async (req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error('Please fill all of them');
    }
    const userAvailable=await users.findOne({email});
    if(userAvailable)
    {
        res.status(400);
        throw new Error('user already registered');
    }
    const hashedpassword=await bycrpt.hash(password,10);
    const createdUser=await users.create({
        username,
        email,
        password:hashedpassword
    });
    if(createdUser)
    console.log(createdUser);
else{
   res.status(400);
   throw new Error("User is not valid") 
}
    res.send("registered");
});

//api to login the usr
const loginUser= asyncHandler(async (req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error('Please fill all of them');
    }
    const userFound= await users.findOne({email});
    if(userFound && (await bycrpt.compare(password,userFound.password))){
             const accessToken=jwt.sign({
                user:{
                    username:userFound.username,
                    id:userFound._id,
                    email:userFound.email
                }
             },process.env.ACCESS_TOKEN,
             {
                expiresIn:"10m"
             }
             )
             res.json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("email or passowrd is invalid");
    }
        res.send("logged in");
});


//api to find the current User
const currentUser= asyncHandler(async (req,res)=>{
    res.json(req.user);
});

module.exports={registerUser,loginUser,currentUser};