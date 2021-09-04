const db = require('../models/index.model');
const getUserId = require("../utils/getUserId");
const fs = require('fs');

exports.getAllGifs = (req, res, next) => {
    db.Gif.findAll()
        .then((gifs) => res.status(200).json({gifs}))
        .catch(error => res.status(400).json({ error })
        )
};


exports.getOneGif = (req, res, next) => {
    db.Gif.findOne({ where: { id: req.params.id } })
        .then((gif) => res.status(200).json({gif}))
        .catch((error) => res.status(404).json({ error })
        )
};

exports.createGif = (req, res, next) => {
    db.Gif.create({
        userId: getUserId(req),
        statusText: req.body.statusText,
        imageUrl: `${req.protocol}://${req.get('host')}/../gifs/${req.file.filename}`,
    })
        .then(() => res.status(201).json({ message: 'gif publié !' }))
        .catch((error) => res.status(400).json({ error }))
};

exports.modifyGif = (req, res, next) => {
    db.Gif.findOne({ where: { id: req.params.id } })
        .then(gif => {
            if (gif.userId !== getUserId(req)) {
                return res.status(401).json({ message: 'Requête non autorisée !' })
            };
            const gifObject = req.file ?
                {
                    ...req.body.gif,
                    imageUrl: `${req.protocol}://${req.get('host')}/gifs/${req.file.filename}`
                } : { ...req.body };
            db.Gif.update({ ...gifObject }, { where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Gif modifié !' }))
                .catch(error => res.status(400).json({ error }))
        });
};

exports.deleteGif = (req, res, next) => {
    db.Gif.findOne({ where: { id: req.params.id } })
        .then(gif => {
            if (gif.userId !== getUserId(req)) {
                return res.status(401).json({ message: 'Requête non autorisée !' })
            };
            const filename = gif.imageUrl.split('/gifs/')[1];
            fs.unlink(`gifs/${filename}`, () => {
                gif.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Gif supprimé !' }))
                    .catch(error => res.status(400).json({ error }))
            })
        });
};

exports.adminDeleteGif = (req, res, next) => {
    db.Gif.findOne({ where: { id: req.params.id } })
        .then(gif => {
            const filename = gif.imageUrl.split('/gifs/')[1];
            fs.unlink(`gifs/${filename}`, () => {
                gif.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Gif supprimé !' }))
                    .catch(error => res.status(400).json({ error }))
            })
        });
};


/* Like/Dislike system - has to be debugged later
exports.rateOneGif = (req, res, next) => {
    if (!getUserId(req)) {
        return res.status(401).json({ message: 'Vous devez être authentifié pour voter !' })
    }
    const userId = getUserId(req);
    const likes = req.body.likes;

    db.Gif.findOne({where: {id: req.params.id}}).then ((gif) => {    

        switch (likes) {

            case 1:
                if (db.Like_Gif.findOne({ where: { gifId: req.params.id, userId: userId } })) {
                    return res.status(401).json({ message: 'Un like a déjà été enregistré !' })
                }
                gif.increment(
                    { likes: + 1 },
                    { where: { id: req.params.id } }
                )
                    .then(() => {
                        db.Like_Gif.create({ gifId: req.params.id, userId: userId })
                    })
                    .then(() => res.status(201).json({ message: 'Gif liké !' }))
                    .catch(error => res.status(500).json({ message: "Erreur" }));
                break;

            case 0:
                if (db.Like_Gif.findOne({ where: { gifId: req.params.id, userId: userId } })) {
                    gif.decrement(
                        { likes: - 1 },
                        { where: { id: req.params.id } })
                        .then(() => {
                            db.Like_Gif.destroy({ where: { gifId: req.params.id, userId: userId } })
                        })
                        .then(() => res.status(200).json({ message: 'Like supprimé !' }))
                        .catch(error => res.status(400).json({ error }));
                    return;
                }
                gif.decrement(
                    { dislikes: - 1 },
                    { where: { id: req.params.id } }
                )
                    .then(() => {
                        db.Dislike_Gif.destroy({ where: { gifId: req.params.id, userId: userId } })
                    })
                    .then(() => res.status(200).json({ message: 'Dislike retiré' }))
                    .catch(error => res.status(500).json({ message: "Erreur" }));
                break;        

            case -1:
                if (db.Dislike_Gif.findOne({ where: { gifId: req.params.id, userId: userId } })) {
                    return res.status(401).json({ message: 'Un dislike a déjà été enregistré !' })
                }
                gif.increment(
                    { dislikes: + 1 },
                    { where: { id: req.params.id } }
                )
                    .then(() => {
                        db.Dislike_Gif.create({ gifId: req.params.id, userId: userId })
                    })
                    .then(() => res.status(201).json({ message: 'Gif liké !' }))
                    .catch(error => res.status(500).json({ message: "Erreur" }));
                break;

            default:
                res.status(400).json({ message: `${likes}` });
        }
    })
    .catch(error => res.status(400).json({ message:'Erreur'}))
};
*/
