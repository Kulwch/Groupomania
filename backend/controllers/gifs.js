const Gif = require("../models/Gif");
const Comment = require("../models/Comment");
const fs = require('fs');

exports.getAllGifs = (req, res, next) => {
    Gif.findAll()
    .then((gifs) => res.status(200).json(gifs))
    .catch(error => res.status(400).json({ error })
)};


exports.getOneGif = (req, res, next) => {
    Gif.findOne({ _id: req.params.id  })
    .then((gif) => res.status(200).json(gif))
    .catch((error) => res.status(404).json({ error })
)};

exports.createGif = (req, res, next) => {
    const gif = Gif.build({
        userId: req.body.userId,
        statusText: req.body.statusText,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
    gif.save()
        .then(() => res.status(201).json({ message: 'gif publié !'}))
        .catch((error) => res.status(400).json({ error }))
}

exports.modifyGif = (req, res, next) => {
    const gifObject = req.file ?
        {
            ...req.body.gif,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Gif.findOne({ _id: req.params.id })
        .then(gif => gif.set({gif}, {...gifObject}))
        .then(() => res.status(200).json({ message: 'Gif modifié !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteGif = (req, res, next) => {
    Gif.findOne({ _id: req.params.id })
        .then(gif => {
            const filename = gif.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                gif.destroy()
                    .then(() => res.status(200).json({ message: 'Gif supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
}


exports.rateOneGif = (req, res, next) => {
   Gif.findOne({ _id: req.params.id }).then((gif) => {

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

exports.getAllComments = (req, res, next) => {
    Gif.findOne({ _id: req.params.id }).then((gif) => {
        Comment.findAll()
        .then((comments) => res.status(200).json(comments))
        .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(404).json({error}))
}

exports.postComment = (req, res, next) => {
    const comment = Comment.build({
        gifId: req.params.id,
        userId: req.body.userId,
        content: req.body.content
    });
    comment.save()
    .then(() => res.status(201).json({ message: 'commentaire publié !'}))
    .catch(error => res.status(400).json({ error }))
    
}

exports.deleteComment = (req, res, next) => {    
    Comment.findOne({_id: req.params.id})
        .then(comment => comment.destroy())
        .then(() => res.status(200).json({ message: 'commentaire effacé !'}))
        .catch(error => res.status(400).json({error}))
}