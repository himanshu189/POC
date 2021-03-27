const express = require('express');
const router=express.Router()
const User =require('../models/user')
const {editValidation} =require('../validation')

const verify = require('./privateRoute')

router.get('/',verify,(req,res)=>{
User.findById({_id:req.user._id})
.then(result=>{
  if(result.role===1){
User.find()
.then(result=> res.send(result.map((result)=>(
 
{id:result._id, name:result.name,
email:result.email ,
role:result.role }
))))
.catch(err=>res.send(err))


}
else{
  res.redirect('/api/user')
}
})


})

// delete user

router.delete('/:id',(req,res)=>{
  User.remove({_id:req.params.id})
  .then(result=>{
    console.log('removed successfully')
   res.send(result)})
  .catch(err=>console.log(err))
})



// edit data 

router.put('/:id',async (req,res)=>{
  const {error,value}= editValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message)

// checking email exist except for the userwe are editting

  const emailExists = await User.findOne({email:req.body.email})
if(emailExists && emailExists.email!==req.body.email ) return res.status(400).send('eamil already exists')


  User.updateOne({_id:req.params.id},{$set:{name:req.body.name,
  email:req.body.email}})
  .then(result=>res.send(result))
  .catch(err=>res.send(err))
})


module.exports=router