const express = require('express');
const router = express.Router();
const passport = require('passport');
const Secteur = require('../models/Secteur');


// Get All
router.get('/', (req, res) => {
    Secteur.find()
        .then((secteur) => {
            res.send(secteur)
        })
});

// Get One
router.get('/:id', (req, res) => {
    Secteur.findOne({ _id: req.params.id })
        .then((oneSecteur) => {
            res.status(200).json(oneSecteur)
        })
});

// Ajout
router.post('/', (req, res) => {
    Secteur.create(req.body).then((secteur) => {
        res.send(secteur)
    })
});

// Modifier
router.put('/:id', (req, res) => {
    Secteur.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(() => {
            Secteur.findOne({ _id: req.params.id })
                .then(function (secteurUpdated) {
                    res.status(299).json(secteurUpdated)
                });
        });
});

// Supprimer
router.delete('/:id', (req, res) => {
    Secteur.findByIdAndDelete({ _id: req.params.id })
        .then((secteur) => {
            res.status(201).json(secteur);
        });
});


module.exports = router;