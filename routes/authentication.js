const express = require('express');
const router = express.Router();
const User = require('../models/users');
const PasswordReset = require('../models/passwordReset');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const nodemailer = require('nodemailer');

// Inscription user
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
                    req.body.statut = "inactif";
                    req.body.rôle = "nouveauCompte"
                    User.create(req.body)
                        .then(function (user) {
                            res.send(user)
                        })
                }
            });
        }
    });
});

// Connexion
router.post('/login', (req, res) => {
    User.find({ email: req.body.email })
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'error 1'
                    });
                }
                if (result) {

                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                        'secret',
                        {
                            expiresIn: "1d"
                        },

                    );

                    return res.status(200).json({
                        message: 'Auth seccussful',
                        checkResult: result,
                        token: token
                    });
                }
                res.status(401).json({
                    message: 'Auth failed',
                    checkResult: result,
                });
            })
        })
});

// Forget password
router.post('/password-forget', (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {

                PasswordReset.create({
                    email: req.body.email,
                    token: Math.floor(Math.random() * 1000)
                }).then((createdToken) => {
                    // email message options
                    const mailOptions = {
                        from: req.body.email,
                        to: 'bentitataher@gmail.com',
                        subject: 'Sent mail from mailApi with req.body.email',
                        html: `Clickti this <a href="http://localhost:4200/#/reset-password/${createdToken.token}">link</a> to reset your password.`,
                    };
                    // email transport configuration

                    var transport = nodemailer.createTransport({
                        service: "gmail",
                        secure: false,
                        auth: {
                            user: "bentitataher@gmail.com",
                            pass: "@Taher1988"
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    });

                    // send email
                    transport.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            res.send('error')
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.reponse);
                            res.json({ message: "email send sucessfully" });
                        }
                    });

                })


            }
            else {
                console.log("Ce mail n'existe pas !");
            }
        })
})

// Reset password
router.post('/password-reset', (req, res) => {
    PasswordReset.findOne({ token: req.body.token })
        .then((reset) => {
            if (reset) {


                bcrypt.hash(req.body.password, 10, (err, hash) => {

                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    }

                    else {
                        req.body.password = hash;
                        User.findOneAndUpdate({ email: reset.email }, req.body)
                            .then(() => {
                                User.findOne({ email: reset.email })
                                    .then((user) => {
                                        res.status(200).json({ user })
                                    })
                            })
                    }
                });

            } else {
                res.status(201).json({ message: "Taken doesn't exists !" })
            }
        })
})



module.exports = router;