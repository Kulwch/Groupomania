const {
  Sequelize,
  DataTypes,
  Model
} = require('sequelize');
const sequelize = require('../models/index.js');
const Comment = require("../models/Comment");

exports.getAllComments = (req, res, next) => {
    sequelize.Comment.findAll()
        .then((comments) => res.status(200).json(comments))
        .catch(error => res.status(400).json({error}))
}

exports.postComment = (req, res, next) => {
    const comment = sequelize.Comment.build({
        gifId: req.params.id,
        userId: req.body.userId,
        content: req.body.content
    });
    comment.save(res)
    .then(() => res.status(201).json({ message: 'commentaire publié !'}))
    .catch(error => res.status(400).json({ error }))    
}

exports.deleteComment = (req, res, next) => {    
    sequelize.Comment.findOne({_id: req.params.id})
        .then(comment => comment.destroy())
        .then(() => res.status(200).json({ message: 'commentaire effacé !'}))
        .catch(error => res.status(400).json({error}))
}
