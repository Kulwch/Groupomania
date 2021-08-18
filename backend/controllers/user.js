const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const sequelize = require('../models/index.js');
const fs = require('fs');
const User = require('../models/User');
const dotenv = require('dotenv').config();

exports.signup = (req, res, next) => {
    
     bcrypt.hash(req.body.password, 10)
    .then(hash => {
        sequelize.User.create({ 
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash
        })
            .then(() => res.status(201).json({ message: ' Nouvel utilisateur créé !' }))
            .catch( error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
    sequelize.User.findOne({email: req.body.email}).then((user) => {
        if(!user) {
            return res.status(401).json({message: 'Utilisateur non trouvé '});
        }
        bcrypt.compare(req.body.password, user.password)
            .then((valid) => {
                if (!valid){
                    return res.status(401).json({message: 'Mot de passe incorrect '
        });
                }
                res.status(200).json({
                    userId: user.id,
                    token: jwt.sign(
                        { userId: user.id },
                        process.env.TOKEN_KEY,
                        { expiresIn: '24h' }
                    )
                });                
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getProfile = (req, res, next) => {
    sequelize.User.findOne({attributes: ['id', 'firstName', 'lastName', 'email'], where: {_id: req.user.id}})
        .then(user => res.status(200).json({user}))
        .catch(error => res.status(404).json({error}))
};

exports.updateProfile = (req, res, next) => {
    const userObject = req.file ?
        {
            ...req.body.user,
            avatarUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    sequelize.User.findOne({_id: req.params.id}).then(user => 
        user.set({user}, {...userObject}))
            .then(() => res.status(200).json({message: "Profil modifié !"}))
            .catch(error => res.status(401).json({message: 'Modification non autorisée !'}))
    .catch(error => res.status(400).json({error}))
};

exports.deleteProfile = (req, res, next) => {
    sequelize.User.findOne({_id: req.params.id}).then(user => {
        const filename = user.avatarUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => { 
            user.destroy()
                .then(() => res.status(200).json({message: 'Profil supprimé !'}))
                .catch(error => res.status(401).json({message: 'Vous n\'êtes pas autorisé à supprimer ce profil !'}))
        })
    })
    .catch(error => res.status(400).json({error}))
};