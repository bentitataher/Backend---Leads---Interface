const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

// Installation express app
const app = express();

// Connexion à mongoDb
mongoose.connect('mongodb://localhost/leadsgo');
mongoose.Promise = global.Promise;

app.use(bodyParser.json())

// Initialisation des routes
app.use('/api', require('./routes/api'));
app.use('/authentication', require('./routes/authentication'));

// Middleware gestion d'erreurs
app.use( (err, req, res, next)=>{
    // console.log(err)
    res.status(422).send({error : err.message})
});

//Ecouter les requettes
app.listen(process.env.port || 4000, ()=>{
  console.log("Ecoute de requettes au port 4000 OK !")
});