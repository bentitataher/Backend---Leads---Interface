const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creer la Schema d'un utilisateur & model
const UserSchema = new Schema({
    nom: {
        type: String,
        required: [true, 'Le nom est obligatoire']
    },
    prenom: {
        type: String,
        required: [true, 'Le prenom est obligatoire']
    },
    email: {
        type: String,
        required: [true, 'Le email est obligatoire']
    },
    password: {
        type: String,
        required: [true, 'Le password est obligatoire']
    }
})

const User = mongoose.model('user', UserSchema);

module.exports = User;
