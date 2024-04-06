

const expressAsyncHandler = require("express-async-handler");
const jwt=require("jsonwebtoken");

const verification=expressAsyncHandler(async (req,res,next)=>{
  let token;
  const accesstoken=req.headers['authorization'];
  if(accesstoken && accesstoken.startsWith("Bearer")){
     token=accesstoken.split(' ')[1];
    jwt.verify(token,process.env.SECRET_KEY,(err,decode)=>{
      if(err){
        res.status(400).json({message:"user unauthorized"})
      }
      req.user=decode.user;
      next();
    })
  }

  if(!token){
    res.status(400).json({message:"user is not authorized"})
  }
  
})


module.exports=verification;
