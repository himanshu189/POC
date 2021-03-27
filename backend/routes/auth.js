const express = require('express');
const router=express.Router()
const {registerValidation,loginValidation} =require('../validation')

const jwt= require('jsonwebtoken')
const User =require('../models/user')
const bcrypt= require('bcryptjs')


router.get('/register', async (req,res)=>{

  User.find()
  .then(result=>res.send(result))
  .catch(err=>res.send('err'))
})

router.post('/register', async (req,res)=>{

  // validate data before making a user
 
  
//  const{error,value} =schema.validate(req.body)
// if(error) return res.status(400).send(error.details[0].message)
 const {error,value}= registerValidation(req.body)
if(error) return res.status(400).send(error.details[0].message)

//  checking if the user is already in database
const emailExists = await User.findOne({email:req.body.email})
if(emailExists) return res.status(400).send('eamil already exists')

// hash the password
const salt = await bcrypt.genSalt(10);
const hashPassword= await bcrypt.hash(req.body.password,salt)




//  res.send(error.details[0].message)

// create new user
  const user =new User({
name:req.body.name,
email:req.body.email,
password:hashPassword,
role:req.body.role
  })
  user.save()
  .then(result=>res.send(result))
  .catch(err=>res.status(404).send(err))
})

// LOgin

router.post('/login',async (req,res)=>{


  // validate data 
  const {error,value}= loginValidation(req.body)
  if(error){ return res.status(400).send(error.details[0].message )}


//  checking if the user is  in database
const user = await User.findOne({email:req.body.email})
if(!user) return res.status(400).send('Invalid email')

// if password is correct
 const validPassword = await bcrypt.compare(req.body.password, user.password);
 if(!validPassword) return res.status(400).send('invalid password')



// create and assign a token
const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
 res.header('auth-token',token).send("success")

// success



})

module.exports= router

