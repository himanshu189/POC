const express = require('express');
const router=express.Router()
const User =require('../models/user')
const {editValidation} =require('../validation')
const Category =require('../models/category')
const verify = require('./privateRoute')

router.get('/',verify, async(req,res)=>{

var auth= await User.findById({_id:req.user._id})

if(auth.role==0) return res.status(400).send('Only Admin is allowed')
var result= await User.find().populate("category")
 
    res.send(result.map(result=>(

      {
        name:result.name,
        _id:result._id,
        email:result.email,
        date:result.date,
        role:result.role,
        category:result.category,
        active:result.active
        
        
          }
    )))
  

})




// res.send(result.map(result=>(
//   {
//     name:result.name,
//     _id:result._id,
//     email:result.email,
//     date:result.date,
//     role:result.role,
//     category:result.category,
//     active:result.active
    
    
//       }
// )))








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
// const currentEmail=await User.findOne({_id:req.params.id})

if(emailExists && req.params.id== emailExists._id ){
  return User.updateOne({_id:req.params.id},{$set:{name:req.body.name,category:req.body.category,
          email:req.body.email}})
          .then(result=>res.send(result))
          .catch(err=>res.send(err))
}
else if(!emailExists){
  User.updateOne({_id:req.params.id},{$set:{name:req.body.name,category:req.body.category,
    email:req.body.email}})
    .then(result=>res.send(result))
    .catch(err=>res.send(err))

}
else{
  res.status(400).send('email already exists')
}


// // if (emailExists && )

// if(emailExists && emailExists.email==req.body.email  ){
// console.log(emailExists.email,req.body.email );
//   return User.updateOne({_id:req.params.id},{$set:{name:req.body.name,category:req.body.category,
//       email:req.body.email}})
//       .then(result=>res.send(result))
//       .catch(err=>res.send(err))
//   }

// else if(emailExists){
//   console.log("2");
//   return res.status('404').send("email already exists")
// }

// if(!emailExists)
// { console.log(('3'));
//    User.updateOne({_id:req.params.id},{$set:{name:req.body.name,category:req.body.category,
//   email:req.body.email}})
//   .then(result=>res.send(result))
//   .catch(err=>res.send(err))}
 
})


router.put('/active/:id',(req,res)=>{
  User.updateOne({_id:req.params.id},{$set:{active:req.body.active
 }})
    .then(result=>res.send(req.body.active==0?"account deactivated":"account reactivated"))
    .catch(err=>res.send(err))

})

module.exports=router