 
const router = require("express").Router();
const Category = require ('../models/category');




router.get("/all", (req, res) => {
    Category.find()
      .then(result => res.send(result))
      .catch(err => res.send(err));
  });
  

 
  
  // router.get("/:id", (req, res) => {
  //   Category.findById(req.params.id)
  //     .then(result => res.send(result))
  //     .catch(err => console.log(err));
  // });
  


  module.exports = router;