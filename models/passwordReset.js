const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema de password forget
const PasswordForgetSchema = new Schema({
    email: {
        type: String,
        require: [false, 'PasswordForget champs']
    },

    token: {
        type: String,
        require: [false, 'token champs']
    },

    // createdAt: {
    //     type: Date,
    //     expires: '2m',
    //     default: Date.now
    //   }

});

const PasswordForget = mongoose.model('passwordForget', PasswordForgetSchema);
module.exports = PasswordForget;