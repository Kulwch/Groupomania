const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/index.model');
const fs = require('fs');
const getUserId = require('../utils/getUserId');
const dotenv = require('dotenv').config();

exports.signup = (req, res, next) => {
    if(!req.body.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)){
        return res.status(400).json({ error : "le mot de passe n'est pas assez fort. Rappel: 8 lettres minimum, 1 chiffre minimum, 1 lettre majuscule minimum, 1 caractères spécial minimum"})
    }
     bcrypt.hash(req.body.password, 10)
    .then(hash => {
        db.User.create({ 
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
    db.User.findOne({ where: {email: req.body.email}}).then((user) => {
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
                    isAdmin : user.isAdmin,
                    token: jwt.sign(
                        { 
                            userId: user.id,
                            isAdmin : user.isAdmin,
                        },
                        process.env.TOKEN_KEY,
                        { expiresIn: '10h' }
                    )
                });                
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getProfile = (req, res, next) => {
    db.User.findOne({attributes: ['id','firstName', 'lastName', 'email', 'avatarUrl', 'isAdmin'], where: {id: req.params.id}})
        .then(user => res.status(200).json({user}))
        .catch(error => res.status(404).json({error}))
};

exports.getAllProfiles = (req, res, next) => {
    db.User.findAll({attributes: ['id','firstName', 'lastName', 'email','avatarUrl', 'isAdmin']})
        .then(users => res.status(200).json({users}))
        .catch(error => res.status(404).json({error}))
};

exports.updateProfile = (req, res, next) => {
    const userObject = req.file ?
        {
            ...req.body.user,
            avatarUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    db.User.findOne({where: { id: req.params.id}})
        .then(user => {
            if(user.id !== getUserId(req)){
                return res.status(401).json({message: 'Requête non autorisée !'})
            }
    user.update({...userObject}, {where: {id: req.params.id}})
            .then(() => res.status(200).json({message: "Profil modifié !"}))
            .catch(error => res.status(401).json({message: 'Modification non autorisée !'}))
    });
};

exports.deleteProfile = (req, res, next) => {
    db.User.findOne({where: { id: req.params.id}})
        .then(user => {
            if(user.id !== getUserId(req)){
                return res.status(401).json({message: 'Requête non autorisée !'})
            }
    user.destroy({where: {id: req.params.id}})
        .then(() => res.status(200).json({message: 'Profil supprimé !'}))
        .catch(error => res.status(401).json({message: 'Vous n\'êtes pas autorisé à supprimer ce profil !'}))
    });
};

exports.adminDeleteProfile = (req, res, next) => {
    db.User.destroy({where: {id: req.params.id}})
        .then(() => res.status(200).json({message: 'Profil supprimé !'}))
        .catch(error => res.status(403).json({message: 'Requête réservée aux admins'}))
};

exports.adminUpdateProfile = (req, res, next) => {
    const userObject = req.file ?
        {
            ...req.body.user,
            avatarUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
        db.User.update({...userObject}, {where: {id: req.params.id}})
            .then(() => res.status(200).json({message: "Profil modifié !"}))
            .catch(error => res.status(403).json({message: 'Modification réservée aux admins !'}))
};

exports.setUserAsAdmin = (req, res, next) => { 
        db.User.findOne({where: {id: req.body.userId}})
            .then((user) => { if(user.isAdmin === true){
                db.User.update({isAdmin: true}, { where: { id: req.params.id }})
                .then(() => res.status(200).json({ message: 'utilisateur promu admin !' }))
                .catch(error => res.status(400).json({ error }))
            }})
            .catch(error => res.status(403).json({ message: 'Requête réservée aux admins'}))           
};