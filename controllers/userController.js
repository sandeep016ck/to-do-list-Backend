
const asyncHandler=require('express-async-handler');
const usermodel=require("../models/user");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const createUser=asyncHandler( async(req,res)=>{
  const {username,email,password}=req.body;
  if(!email || !username || !password){
    res.status(400);
    throw new Error("all fields are mandatory");
  }
  const hashp=await bcrypt.hash(password,10);
  const user=await usermodel.create({
    username,
    email,
    password:hashp
  });

  res.status(200).json({Message:"user registered"})
})

const userLogin=asyncHandler( async(req,res)=>{
  const {email,password}=req.body;
  if(!email || !password){
    res.status(400).json({message:'all fields are mandatory'})
  }

  const validuser=await usermodel.findOne({email});
  if(validuser && (await bcrypt.compare(password,validuser.password))){
    const accesstoken=jwt.sign({
      user:{
        username:validuser.username,
        email:validuser.email,
        id:validuser.id
      }
    },process.env.SECRET_KEY,{expiresIn:"10m"})
    res.status(200).json({accesstoken});  
  }else{
    res.status(401).json({message:"incorrect email or password"})
  }
})





module.exports={
  createUser,
  userLogin
}