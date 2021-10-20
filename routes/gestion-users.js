const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

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

// Ajout utilisateur par Admin
router.post('/signup', function (req, res, next) {
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {

          return res.status(409).json({ message: 'Mail exist' });

      } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) {
                  return res.status(500).json({
                      error: err
                  });
              } else {
                  req.body.password = hash;
                  User.create(req.body)
                      .then(function (user) {
                          res.send(user)
                      })
              }
          });
      }
  });
});


module.exports = router;