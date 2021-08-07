const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv').config();

exports.signup = (req, res, next) => {
     bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = User.build({ 
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash
        });
        user.save()
            .then(() => res.status(201).json({ message: ' Nouvel utilisateur créé !' }))
            .catch( error => res.status(400).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

exports.login = (req, res, next) => {
    User.findOne({where: {email: req.body.email}}).then((user) => {
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
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        process.env.TOKEN_KEY.toString(),
                        { expiresIn: '24h' }
                    )
                });                
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.updateProfile = (req, res, next) => {
    
}