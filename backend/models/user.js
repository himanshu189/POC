const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;
const userSchema= new Schema ({
  name:{
    type:String,
    required:true,
    max:255,
    min:6
  }
,
email:{
  type:String,
  required:true,
  max:255,
  min:6
}
,
password:{
  type:String,
  required:true,
  min:6,
  max:1024
},
role:{
  type:Number,
  default:0
},
category:{
  type: ObjectId,
  ref: "Category", 
  required : true
},

active:{
  type:Number,
  default:1 //1 means active 0 means inactive
},
date:{type:Date,
default:Date.now}
})

const User = mongoose.model("User",userSchema)

module.exports= User