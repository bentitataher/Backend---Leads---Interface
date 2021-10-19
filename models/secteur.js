const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema Secteur
const SecteurSchema = new Schema({
    description : {
        type: String,
        require: [false, 'Champs description secteur obligatoire']
    },

    secteur : {
        type: String,
        require: [true, 'Champs secteur obligatoire']
    }
 
});

const Secteur = mongoose.model('Secteur', SecteurSchema);
module.exports = Secteur;