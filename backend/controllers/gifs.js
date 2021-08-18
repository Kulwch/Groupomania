const Sequelize = require('sequelize');
const sequelize = require('../models/index.js');
const getUserId = require("../utils/getUserId");
const Gif = require("../models/Gif");
const fs = require('fs');

exports.getAllGifs = (req, res, next) => {
    sequelize.Gif.findAll()
    .then((gifs) => res.status(200).json(gifs))
    .catch(error => res.status(400).json({ error })
)};


exports.getOneGif = (req, res, next) => {
    sequelize.Gif.findOne({ _id: req.params.id  })
    .then((gif) => res.status(200).json(gif))
    .catch((error) => res.status(404).json({ error })
)};

exports.createGif = (req, res, next) => {
    sequelize.Gif.create({
        userId: getUserId(req),
        statusText: req.body.statusText,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    })
        .then(() => res.status(201).json({ message: 'gif publié !'}))
        .catch((error) => res.status(400).json({ error }))
}

exports.modifyGif = (req, res, next) => {
    const gifObject = req.file ?
        {
            ...req.body.gif,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    sequelize.Gif.findOne({ _id: req.params.id })
        .then(gif => gif.set({gif}, {...gifObject}))
        .then(() => res.status(200).json({ message: 'Gif modifié !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteGif = (req, res, next) => {
    sequelize.Gif.findOne({ _id: req.params.id })
        .then(gif => {
            const filename = gif.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                gif.destroy(res)
                    .then(() => res.status(200).json({ message: 'Gif supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
}


exports.rateOneGif = (req, res, next) => {
   sequelize.Gif.findOne({ _id: req.params.id }).then((gif) => {

        switch (req.body.like) {
            case 0:                
                    
                break;

            case 1:                
                                
                break;
            
            case -1:                
                         
                break;

            default:
                return 'Requête invalide';
        }
    })
    .catch((error) => res.status(404).json({error}));
}

