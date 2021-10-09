const express = require('express');
const router = express.Router();
const User = require('../models/users')

//Get tous les rendes-vous de la db
router.get('/leads', (req, res, next)=>{
  User.find({}).then( (users)=>{
    res.send(users)
  })  
});

//Get un  rendes-vous de la db
router.get('/leads/:id', (req, res, next)=>{
    User.findOne({_id: req.params.id}).then( (user)=>{
      res.send(user)
    })  
  });

// Ajouter un RDV
router.post('/leads', (req, res, next)=>{
    User.create(req.body).then( (user)=>{
        res.send(user)
    }).catch(next)
});

// Mettre à ajourun RDV
router.put('/leads/:id', (req, res, next)=>{
    User.findByIdAndUpdate({_id : req.params.id}, req.body).then( ()=>{
        User.findOne({_id : req.params.id}).then((user)=>{
            res.send(user)
        });
    });
});

// Supprimer un RDV
router.delete('/leads/:id', (req, res, next)=>{
    User.findByIdAndRemove({_id : req.params.id}).then( (user)=>{
      res.send(user)  
    });
});

module.exports = router;


