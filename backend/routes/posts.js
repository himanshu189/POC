const express = require('express');
const User =require('../models/user')

const router=express.Router()

const verify = require('./privateRoute')



router.get('/',verify,(req,res)=>{

User.findById({_id:req.user._id})
.then(result=>{
if(result.role===1){
   res.send("1")
}
else{
  res.send("0")
}

})
.catch(err=>res.send(err))



})

module.exports= router
