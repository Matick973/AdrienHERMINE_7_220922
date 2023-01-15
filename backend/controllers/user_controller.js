const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user_model')
const fs = require('fs');
const { signUpErrors } = require('../utils/errors_utils');

// Logique métier inscription utilisateur :
exports.signup = (req, res, next) => {

    const userObject = req.file ? {
        ...JSON.parse(req.body.user),
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    console.log("userObject", userObject)

    delete userObject._id;
    delete userObject._userId;

    bcrypt.hash(req.body.password, 10) //hashage du mot de passe avec bcrypt avec 10 passes

        .then(hash => {

            const user = new User({
                ...userObject,
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: hash,
            })

            user.save()

                .then(() => res.status(201).json({ message: 'Bienvenue !' })) // ressource créée
                .catch((err) => {                                                 
                    let errors = signUpErrors(err);                            //Gestionnaire d'erreurs
                    res.status(500).send({ errors })                        
                })
        })
        .catch(error => res.status(500).json({ error })); // Error 500 server
}

// Logique métier connexion utilisateur :
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur ou Mot de passe incorrect !' }); // Error 401 Unauthorized
            }
            bcrypt.compare(req.body.password, user.password)

                .then(valid => {

                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe ou Utilisateur incorrect !' }); // Error 401 Unauthorized
                    }

                    const token = jwt.sign({ userId: user._id, admin: user.admin }, 'STUDENT_TOKEN_OCR_2022_FOR/P7&20220922', { expiresIn: '72h' })

                    res.cookie("access_token", token, { httpOnly: true, secure: false })
                    res.status(200).json({ user: user._id, admin: user.admin });

                })
                .catch(error => res.status(500).json({ error })); // Error 500 server
        })
        .catch(error => res.status(500).json({ error })); // Error 500 server
};

// Logique métier déconnexion utilisateur :
exports.logout = (req, res, next) => {
    res.clearCookie("access_token").status(200).json({ message: "Successfully logged out" });
    //res.redirect('/') //Vers page d'accueil ou connexion
}

// Logique métier récupération un utilisateur par ID :
exports.oneUser = (req, res, next) => {
    User.findOne({ _id: req.params.id }).select('-password')                     // Exception Password
        .then(User => res.status(200).json({ User }))                                 // Récupération réussie
        .catch(error => res.status(400).json({ error, error: 'Id Unknown' }))       // Error 400 utilisateur inconnu
}

// Logique métier récupération Tous les utilisateurs :
exports.allUsers = (req, res, next) => {
    User.find().select('-password')                                             // Exception Password
        .then((User) => res.status(200).json({ User }))                               // Récupération réussie
        .catch(error => res.status(500).json({ error }));                           // Error 500 server
}

// Logique métier modification utilisateur :
exports.modifyUser = (req, res, next) => {

    const userObject = req.file ? {
        ...JSON.parse(req.body.user),
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete userObject._userId;

    User.findOne({ _id: req.params.id })

        .then((modifiedUser) => {

            if (modifiedUser.id != req.auth.userId) {

                res.status(401).json({ message: 'Not authorized' });
            } else {

                User.updateOne({ "_id": (req.params.id) }, { ...userObject, $set: { bio: req.body.bio, } })

                    .then(() => res.status(200).json({ modifiedUser }))
                    .catch(error => res.status(401).json({ error }));
            }
        })

        .catch((error) => { res.status(400).json({ error }) });
}

// Logique métier suppression utilisateur :
exports.deleteUser = (req, res, next) => {

    User.findOne({ _id: req.params.id })

        .then(User => {

            if (User.id != req.auth.userId) {

                console.log("User.id", User.id)
                console.log("auth", req.auth.userId)

                res.status(401).json({ message: 'Not authorized' });
            } else {

                if (User.imageUrl) {
                    const filename = User.image.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        User.deleteOne({ _id: req.params.id })
                            .then(() => { res.clearCookie("access_token").status(200).json({ message: 'Compte désactivé!' }) })
                            .catch(error => res.status(401).json({ error }));
                    })
                } else {
                    User.deleteOne({ _id: req.params.id })
                        .then(() => { res.clearCookie("access_token").status(200).json({ message: 'Compte désactivé!' }) })
                        .catch(error => res.status(401).json({ error }));
                }
            }
        })

        .catch(error => { res.status(500).json({ error }) });
}

