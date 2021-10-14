const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creer la Schema d'un utilisateur & model
const EnregistrementSchema = new Schema({
    entreprise: {
        type: String,
        required: [true, 'Entreprise : Champs obligatoire']
    },
    adresse: {
        type: String,
        required: [true, 'Adresse : Champs obligatoire']
    },
    codePostal: {
        type: String,
        required: [true, 'Code postal : Champs obligatoire']
    },
    codeTVA: {
        type: String,
        required: [true, 'Code TVA : Champs obligatoire']
    },
    secteur: {
        type: String,
        required: [true, 'Secteur : Champs obligatoire']
    },
    dateEnregistrement: {
        type: String,
        required: [true, 'Date enregistrement : Champs obligatoire']
    },
    dateRDV: {
        type: String,
        required: [true, 'Date RDV : Champs obligatoire']
    },
    telephone: {
        type: String,
        required: [true, 'Téléphone : Champs obligatoire']
    },
    commentaire: {
        type: String,
        required: [false, 'Champs commentaire non obligatoire']
    },
    contactProspect: {
        type: String,
        required: [true, 'Contact prospect : Champs obligatoire']
    },
    enregistrement: {
        type: String,
        required: [true, 'Enregistrement : Champs obligatoire']
    }
    
})

const Enregistrement = mongoose.model('enregistrement', EnregistrementSchema);

module.exports = Enregistrement;
