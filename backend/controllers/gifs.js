const db = require('../models/index.model');
const getUserId = require("../utils/getUserId");
const fs = require('fs');

exports.getAllGifs = (req, res, next) => {
    db.Gif.findAll({ where: {userId: req.params.id}})
    .then((gifs) => res.status(200).json(gifs))
    .catch(error => res.status(400).json({ error })
)};


exports.getOneGif = (req, res, next) => {
    db.Gif.findOne({where: { id: req.params.id  }})
    .then((gif) => res.status(200).json(gif))
    .catch((error) => res.status(404).json({ error })
)};

exports.createGif = (req, res, next) => {
    db.Gif.create({
        userId: getUserId(req),
        statusText: req.body.statusText,
        imageUrl: `${req.protocol}://${req.get('host')}/gifs/${req.file.filename}`,
    })
        .then(() => res.status(201).json({ message: 'gif publié !'}))
        .catch((error) => res.status(400).json({ error }))
}

exports.modifyGif = (req, res, next) => {
    db.Gif.findOne({where: { id: req.params.id}})
        .then(gif => {
            if(gif.userId !== getUserId(req)){
                return res.status(401).json({message: 'Requête non autorisée !'})
            };
        const gifObject = req.file ?
            {
                ...req.body.gif,
                imageUrl: `${req.protocol}://${req.get('host')}/gifs/${req.file.filename}`
            } : { ...req.body };
        db.Gif.update({...gifObject}, {where: { id: req.params.id }})
            .then(() => res.status(200).json({ message: 'Gif modifié !' }))
            .catch(error => res.status(400).json({ error }))
    });
}

exports.deleteGif = (req, res, next) => {
    db.Gif.findOne({where: { id: req.params.id}})
        .then(gif => {
            if(gif.userId !== getUserId(req)){
                return res.status(401).json({message: 'Requête non autorisée !'})
            };
        const filename = gif.imageUrl.split('/gifs/')[1];
            fs.unlink(`images/${filename}`, () => {
            gif.destroy({where: { id: req.params.id}})
                .then(() => res.status(200).json({ message: 'Gif supprimé !' }))
                .catch(error => res.status(400).json({ error }))
        })
    });
};

exports.adminDeleteGif = (req, res, next) => {
    db.Gif.findOne({where: { id: req.params.id}})
        .then(gif => {
            const filename = gif.imageUrl.split('/gifs/')[1];
                fs.unlink(`images/${filename}`, () => {
        gif.destroy({where: {id: req.params.id}})
            .then(() => res.status(200).json({ message: 'Gif supprimé !' }))
            .catch(error => res.status(400).json({ error }))
        })
    });
}

exports.adminModifyGif = (req, res, next) => {
    const gifObject = req.file ?
        {
            ...req.body.gif,
            imageUrl: `${req.protocol}://${req.get('host')}/gifs/${req.file.filename}`
        } : { ...req.body };
    db.Gif.update({...gifObject}, {where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: 'Gif modifié !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.rateOneGif = (req, res, next) => {
    const userId = getUserId(req);
    db.Gif.findOne({where: { id: req.params.id }}).then((gif) => {

        switch (req.body.like) {
            case 0: 
                gif.update(
					{ likes: gif.likes - 1},
					{ where: { id : req.params.id }}
				)				
				.then(() => {
					gif.removeUser(userId);
					db.User.findByPk(userId).then(user => {
						user.removeGif(req.params.id);
					})
				})
				.then(() => res.status(201).json({ message: 'Like retiré'}));
				break;

            case 1: 
                gif.update(
                    {likes: gif.likes + 1},
                    {where: {id: req.params.id}}
                )
                .then(() => {
                        gif.addUser(userId);
                        db.User.findByPk(userId).then( user => {
                            user.addGif(req.params.id);
                        })
                    })
                    .then(() => res.status(201).json({ message: 'Gif liké !'}))                    
                                    
                    break;
            
            case -1: 
                gif.update(
                    {dislikes: gif.dislikes + 1},
                    {where: {id: req.params.id}}
                )
                .then(() => {
                        gif.addUser(userId);
                        db.User.findByPk(userId).then( user => {
                            user.addGif(req.params.id);
                        })
                    })
                    .then(() => res.status(201).json({ message: 'Gif liké !'}))                
                            
                    break;

            default:
                return 'Requête invalide';
        }
    })
    .catch((error) => res.status(404).json({error}));
}

exports.likeGif = (req, res, next) => {
    const gifId = parseInt(req.params.gifId);
    db.Gif.findOne({id: gifId}).then((gif) => {
            if (db.Like.findOne({where: { userId: gif.userId, gifId: gif._id}})) {
                return res.status(409).json({message: 'gif déjà liké !'})
            }
            db.Like.create({
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
    db.Gif.findOne({id: gifId}).then((gif) => {
        const like = db.Like.findOne({where: { userId: gif.userId, gifId: gif._id}});
            like.destroy()
                .then(() => res.status(201).json({message: 'like supprimé !'}))
                .catch(error => res.status(400).json({error}))
                
    })
        .catch( error => res.status(404).json({ message: 'gif non trouvé !' }))
}