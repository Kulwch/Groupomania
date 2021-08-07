const Gif = require("../models/Gif")
const fs = require('fs');

exports.getAllGifs = (req, res, next) => {
    Gif.find()
    .then((gifs) => res.status(200).json(gifs))
    .catch(error => res.status(400).json({ error })
)};


exports.getOneGif = (req, res, next) => {
    Gif.findOne({

    })
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
            ...JSON.parse(req.body.gif),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Gif.updateOne({ _id: req.params.id }, { ...gifObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteGif = (req, res, next) => {
    Gif.findOne({ _id: req.params.id })
        .then(gif => {
            const filename = gif.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Gif.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
}

exports.rateOneGif = (req, res, next) => {
   
}

exports.getAllComments = (req, res, next) => {

}

exports.postCommentGif = (req, res, next) => {

}