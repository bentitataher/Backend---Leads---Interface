const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema de forget password
const PasswordForgetSchema = new Schema({
    email: {
        type: String,
        require: [false, 'PasswordForget champs']
    },

    token: {
        type: String,
        require: [false, 'token champs']
    },

    createdAt: {
        type: Date, 
        default: Date.now,
        expires: '2m', // this is the expiry time
        
    }

});

const PasswordForget = mongoose.model('passwordForget', PasswordForgetSchema);
module.exports = PasswordForget;