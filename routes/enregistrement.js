const express = require('express');
const router = express.Router();

const Enregistrement = require('../models/enregistrement');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'uploads');
    },
    filename: (res, file, cb) =>{
        const newFileName = Date.now() + path.extname(file.originalname);
        cb(null, newFileName)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage: storage, fileFilter : fileFilter})

router.post('/ajout', upload.single('image') , function (req, res, next) {
    req.body.enregistrement = req.file.path
    Enregistrement.create(req.body)
                  .then((enregistrement) =>{
                      res.status(209).send(enregistrement)
                  })
});

module.exports = router;