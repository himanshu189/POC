const express = require('express');
const router=express.Router()
const User =require('../models/user')
const bcrypt= require('bcryptjs')
const Category =require('../models/category')

const verify = require('./privateRoute')
// get user
router.get('/',verify,async(req,res)=>{
var result = await User.findById({_id:req.user._id})

var cat =await Category.findById({_id:result.category})
res.send(

  {
    _id:result._id,
    category:cat.name,
    name:result.name,
    date:result.date,
    email:result.email,
    password:result.password

  }
)

})


// reset password

router.put('/:id', async (req,res)=>{
  const salt = await bcrypt.genSalt(10);

    const hashPassword= await bcrypt.hash(req.body.password,salt)

    User.updateOne({_id:req.params.id},{$set:{password:hashPassword}})
    .then(result1=>{
      res.send(result1)
    })
    .catch(err=>res.send("err"))
  
  .catch(err=>{
    res.send('err')
  })

  

})


module.exports=router