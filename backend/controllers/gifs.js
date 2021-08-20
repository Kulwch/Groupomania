const Sequelize = require('sequelize');
const sequelize = require('../models/index.js');
const fs = require('fs');

exports.getAllGifs = (req, res, next) => {
    sequelize.Gif.findAll({ where: {userId: req.params.id}})
    .then((gifs) => res.status(200).json(gifs))
    .catch(error => res.status(400).json({ error })
)};


exports.getOneGif = (req, res, next) => {
    sequelize.Gif.findOne({where: { id: req.params.id  }})
    .then((gif) => res.status(200).json(gif))
    .catch((error) => res.status(404).json({ error })
)};

exports.createGif = (req, res, next) => {
    sequelize.Gif.create({
        userId: req.body.userId,
        statusText: req.body.statusText,
        imageUrl: `${req.protocol}://${req.get('host')}/gifs/${req.file.filename}`,
    })
        .then(() => res.status(201).json({ message: 'gif publié !'}))
        .catch((error) => res.status(400).json({ error }))
}

exports.modifyGif = (req, res, next) => {
    const gifObject = req.file ?
        {
            ...req.body.gif,
            imageUrl: `${req.protocol}://${req.get('host')}/gifs/${req.file.filename}`
        } : { ...req.body };
    sequelize.Gif.update({...gifObject}, {where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: 'Gif modifié !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteGif = (req, res, next) => {
    sequelize.Gif.destroy({where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: 'Gif supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.adminDeleteGif = (req, res, next) => {
     sequelize.Gif.destroy({where: {id: req.params.id}})
            .then(() => res.status(200).json({ message: 'Gif supprimé !' }))
            .catch(error => res.status(400).json({ error }));
}

exports.adminModifyGif = (req, res, next) => {
    const gifObject = req.file ?
        {
            ...req.body.gif,
            imageUrl: `${req.protocol}://${req.get('host')}/gifs/${req.file.filename}`
        } : { ...req.body };
    sequelize.Gif.update({...gifObject}, {where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: 'Gif modifié !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.rateOneGif = (req, res, next) => {
   sequelize.Gif.findOne({where: { id: req.params.id }}).then((gif) => {

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

