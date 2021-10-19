const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema Secteur
const SecteurSchema = new Schema({
    descriptionSecteur : {
        type: String,
        require: [false, 'Champs description secteur obligatoire']
    },

    secteur : {
        type: String,
        require: [false, 'Champs secteur obligatoire']
    }
 
});

const Secteur = mongoose.model('Secteur', SecteurSchema);
module.exports = Secteur;