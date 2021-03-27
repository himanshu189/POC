// validation
const Joi =require('joi')

// register vallidation
const registerValidation =(data)=>{


const schema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),

  password: Joi.string().min(6).required(),
  role: Joi.number(),


}
)
 return schema.validate(data)
}

// login vallidation
const loginValidation =(data)=>{


  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
  
    password: Joi.string().min(6).required(),
  
  }
  )
   return schema.validate(data)
  }
  
  // edit validation
  const editValidation =(data)=>{


    const schema = Joi.object({
      name: Joi.string().min(6).required(),
      email: Joi.string().min(6).required().email(),
    
      role: Joi.number(),
    
    
    }
    )
     return schema.validate(data)
    }

module.exports.registerValidation=registerValidation;
module.exports.loginValidation=loginValidation;
module.exports.editValidation=editValidation;
