const Sequelize = require('sequelize');
const sequelize = require('../models/index.js');
const User = require('../models/Like');

exports.likeGif = (req, res, next) => {
    const gifId = parseInt(req.params.gifId);
    sequelize.Gif.findOne({id: gifId}).then((gif) => {
            if (sequelize.Like.findOne({where: { userId: gif.userId, gifId: gif._id}})) {
                return res.status(409).json({message: 'gif déjà liké !'})
            }
            sequelize.Like.create({
                gifId: gifId,
                userId: gif.userId,
            })
                .then(() => res.status(201).json({message: 'gif liké !'}))
                .catch(error => res.status(400).json({error}))
                
    })
        .catch( error => res.status(404).json({ message: 'gif non trouvé !' }))

}

exports.dislikeGif = (req, res, next) => {
    const gifId = parseInt(req.params.gifId);
    sequelize.Gif.findOne({id: gifId}).then((gif) => {
        const like = sequelize.Like.findOne({where: { userId: gif.userId, gifId: gif._id}});
            like.destroy()
                .then(() => res.status(201).json({message: 'like supprimé !'}))
                .catch(error => res.status(400).json({error}))
                
    })
        .catch( error => res.status(404).json({ message: 'gif non trouvé !' }))
}