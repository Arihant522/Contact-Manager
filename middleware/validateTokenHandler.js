const asyncHandler=require("express-async-handler");
const jwt=require("jsonwebtoken");

const validateToken=asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader=req.headers.authorization ||req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer"))
    {
        token=authHeader.split(" ")[1];
        console.log(token);
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
            if(err)
            {
                res.status(401);
                throw new Error('Not authorized to access');
            }
            else{
                console.log(decoded.user);
                req.user=decoded.user;
                next();
            }
        })
        if(!token)
        {
            res.status(401);
            throw new Error('Not authorized or token is missing to access');
        }
    }
})
module.exports=validateToken;
