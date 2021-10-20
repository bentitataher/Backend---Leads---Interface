const express = require('express');
const router = express.Router();
const User = require('../models/users');

//Get tous les utilisateur de la db
router.get('/', (req, res, next)=>{
    User.find({}).then( (users)=>{
      res.send(users)
    })  
  });
  
  //Get un  utilisateur de la db
  router.get('/:id', (req, res, next)=>{
      User.findOne({_id: req.params.id}).then( (user)=>{
        res.send(user)
      })  
    });


module.exports = router;