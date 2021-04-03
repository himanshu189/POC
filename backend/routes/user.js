const express = require('express');
const router=express.Router()
const User =require('../models/user')
const bcrypt= require('bcryptjs')
const Category =require('../models/category')
const nodemailer = require('nodemailer');
const verify = require('./privateRoute')
const crypto = require('crypto');


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




router.post('/reset',(req,res)=>{


crypto.randomBytes(32,(err,buffer)=>{
 if(err){
   console.log(err)
 }
 const token =buffer.toString('hex')


  console.log(req.body.email)
  User.findOne({email:req.body.email})
  .then(result=>{

result.token=token
result.expireToken=Date.now() + 3600000
result.save()
.then(ress=>{


    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      // mlsrvr.vinove.com/sogo
      port: 2525,
      auth: {
        user: "d02443076adb95",
        pass: "526cd8f7186e2c"
      }
    });
    var mailOptions={
      from:'no-reply@mail.com',
      to:req.body.email,
      subject:'password reset',
      html:`hello ${result.name}
      click here on  <a href='http://localhost:3000/reset/${token}' >link</a> to change password
      `
    }
    transport.sendMail(mailOptions, function(error, info){
      if (error) {
        res.status(400).send(error);
      } else {
       res.send('Email sent: ' + info.response);
      }


    })

})



  })
  .catch(result=>res.status(400).send('email.doesnt exist'))
})


})


router.put('/newPassword',async(req,res)=>{

console.log(req.body.id)


const salt = await bcrypt.genSalt(10);

const hashPassword= await bcrypt.hash(req.body.new,salt)

if(req.body.new!==req.body.confirm) return res.status(400).send('passwords dont match')


User.findOneAndUpdate({token:req.body.id, expireToken:{$gt: Date.now()} },{$set:{password:hashPassword}})
.then(result=>res.send('password updated'))
.catch(err=>res.status(400).send('cant update password'))


})



router.put('/:id', async (req,res)=>{
  const salt = await bcrypt.genSalt(10);

    const hashPassword= await bcrypt.hash(req.body.newPassword,salt)
       
    const user = await User.findOne({_id:req.params.id})

     const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);
     if(!validPassword) return res.status(400).send('invalid old password')

if(req.body.newPassword.length<5) return res.status(400).send('password too short')

    if(req.body.newPassword!==req.body.confirmNewPassword) return res.status(400).send('new password and confirm password are not matching')
 
   
   
    User.findOneAndUpdate({_id:req.params.id},{$set:{password:hashPassword}})
    .then(result1=>{

      res.send('Password change successful')
    })
    .catch(err=>res.send("err"))
  
 
  

})


module.exports=router