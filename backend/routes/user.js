const express = require('express');
const router=express.Router()
const User =require('../models/user')
const bcrypt= require('bcryptjs')

const verify = require('./privateRoute')
// get user
router.get('/',verify,(req,res)=>{
User.findById({_id:req.user._id})
.then(result=>{
  if(result.role===0){
res.send(result)


}
else{
  res.redirect('/api/admin')
}
})


})


// reset password

router.put('/:id', async (req,res)=>{
  const salt = await bcrypt.genSalt(10);

    const hashPassword= await bcrypt.hash(req.body.password,salt)

    User.updateOne({_id:req.params.id},{$set:{password:hashPassword}})
    .then(result1=>{
      res.send(result1)
    })
    .catch(err=>res.send(err))
  
  .catch(err=>{
    res.send(err)
  })

  

})


module.exports=router