
const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
  username:{
    type:String,
    required:[true,"mandatory to enter"]
  },
  email:{
    type:String,
    required:[true,"to be entered"],
    unique:[true,"should be unique"]
  },
  password:{
    type:String,
    required:[true,"password is mandatory"]
  }
  
})

module.exports=mongoose.model("user",userSchema);