const Sequelize = require('sequelize');
const sequelize = require('../models/index.js');
const getUserId = require("../utils/getUserId");
const User = require('../models/User');
const Comment = require("../models/Comment");

exports.getAllComments = (req, res, next) => {
    sequelize.Comment.findAll()
        .then((comments) => res.status(200).json(comments))
        .catch(error => res.status(400).json({error}))
}

exports.postComment = (req, res, next) => {    
        sequelize.Comment.create({
            gifId: req.body.gifId,
            userId: getUserId(req),
            content: req.body.content
        })
        .then(() => res.status(201).json({ message: 'commentaire publié !'}))
        .catch(error => res.status(400).json({ error }))   
};

exports.deleteComment = (req, res, next) => {    
    sequelize.Comment.findOne({where: { id: req.params.id }}).then(comment => 
        comment.destroy())
            .then(() => res.status(200).json({ message: 'commentaire effacé !'}))
            .catch(error => res.status(400).json({error}))
    .catch(error => res.status(404).json({error}))

}

exports.adminDeleteComment = (req, res, next) => { 
    if(!req.user.isAdmin === true){
        return res.status(401).json({message: 'Vous n\'êtes pas autorisé à modifier ce profil !'})
    }
    sequelize.Comment.findOne({where: { id: req.params.id }}).then(comment => 
        comment.destroy())
            .then(() => res.status(200).json({ message: 'commentaire effacé !'}))
            .catch(error => res.status(400).json({error}))
    .catch(error => res.status(404).json({error}))

}