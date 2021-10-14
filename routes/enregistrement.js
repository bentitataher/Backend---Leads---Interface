const express = require('express');
const router = express.Router();
const Enregistrement = require('../models/enregistrement');

router.post('/ajout', function (req, res, next) {
    Enregistrement.create(req.body)
                  .then((enregistrement) =>{
                      res.status(400).send(req.body)
                  })
});

module.exports = router;