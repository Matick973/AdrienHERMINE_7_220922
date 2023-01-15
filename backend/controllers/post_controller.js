const Post = require('../models/post_model')
const User = require('../models/user_model')
const fs = require('fs');

// Logique métier création d'un post :
exports.createPost = (req, res, next) => {
    
    const postObject = req.file ? 
    {
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete postObject._id;
    delete postObject._userId;

    console.log("postObject", postObject)

    const post = new Post({
        ...postObject,
        userId: req.auth.userId,
        message : req.body.message,
    })

    post.save()

    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json({ error }))

}

// Logique métier accès All post :
exports.onePost = (req, res, next) => {
    Post.findOne( {_id: req.params.id} )
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }))
};

// Logique métier accès All post :
exports.allPost = (req, res, next) => {
    Post.find()
        .sort({ createdAt: -1 })                            //Classement antéchronologique
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }))
};

// Logique métier modification d'un post :
exports.modifyPost = (req, res, next) => {

    const postObject = req.file ? 
    {
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete postObject._userId;

    Post.findOne({ _id: req.params.id })

        .then((modifiedPost) => {

            if (modifiedPost.userId != req.auth.userId && !req.auth.admin) {

                res.status(401).json({ message: 'Not authorized' });

            } else {

                Post.updateOne({ "_id": (req.params.id) }, { ...postObject, _id: req.params.id }, { new: true })
                    .then(() => res.status(200).json({ modifiedPost }))
                    .catch(error => res.status(401).json({ error }));

            }
        })
        .catch((error) => {res.status(400).json({ error })});
}

// Logique métier suppression d'un post :
exports.deletePost = (req, res, next) => {

    Post.findOne({ _id: req.params.id })

        .then(Post => {
          
            console.log(req.auth.admin)

            if (Post.userId != req.auth.userId && !req.auth.admin ) {

                res.status(401).json({ message: 'Not authorized ligne 85' });

            } else if (Post.image) {
                const filename = Post.image.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Post supprimé !' }) })
                        .catch(error => res.status(401).json({ message: error }));
                });

            }else {
                Post.deleteOne({ _id: req.params.id })
                    .then(() => { res.status(200).json({ message: 'Post supprimé !' }) })
                    .catch(error => res.status(401).json({ message: error }));
            }
        })

        .catch(error => res.status(500).json({ message: error }));
}

exports.likePost = async (req, res, next) => {

    Post.findOne({ _id: req.params.id })                                            // Ciblage de l'élément

    switch (req.body.like) {

        
        case 1:                                                                     // Si like = 1 l'utilisateur aime le post, like enregistré si "userID" n'est pas présent dans le tableau [likers]

            Post.updateOne({ _id: req.params.id },
                {
                    $push: { likers: req.body.userId },                            // Ajout "userId" dans le tableau [likers]
                    $inc: { likes: 1 }                                             // Incrémentation + 1 dans objet likes
                })

                .then(() => { res.status(200).json({ message: 'Like + 1' }) })
                .catch(error => res.status(400).json({ error }))
            //}
            break

        case -1:                                                                    //Si like = -1 l'utilisateur n'aime pas la sauce like enregistré si "userID" n'est pas présent dans le tableau [dislikers]

            Post.updateOne({ _id: req.params.id },
                {
                    $push: { dislikers: req.body.userId },                         // Ajout "userId" dans le tableau [dislikers]
                    $inc: { dislikes: 1 }                                          // Incrémentation + 1 dans objet dislikes
                })

                .then(() => { res.status(200).json({ message: 'Dislike + 1' }) })
                .catch(error => res.status(400).json({ error }))

            break

        case 0:                                                                     //Si like = 0 l'utilisateur annule le like/dislike de l'utilisateur

            Post.findOne({ _id: req.params.id })

                .then(post => {
                    console.log(post);

                    if (post.likers.indexOf(req.body.userId) !== -1) {                // Condition : Si tableau [likers] contient déja "userId" alors exécution.

                        Post.updateOne({ _id: req.params.id },
                            {
                                $pull: { likers: req.body.userId },                  // Retrait "userId" dans le tableau [likers]
                                $inc: { likes: -1 }                                  // Incrémentation -1 dans objet likes
                            })

                            .then(() => { res.status(200).json({ message: 'Like retiré' }) })
                            .catch(error => res.status(400).json({ error }))
                    }

                    else if (post.dislikers.indexOf(req.body.userId) !== -1) {        // Condition : Si tableau [dislikers] contient déja "userId" alors exécution.

                        Post.updateOne({ _id: req.params.id },
                            {
                                $pull: { dislikers: req.body.userId },                // Retrait "userId" dans le tableau [diliskers]
                                $inc: { dislikes: -1 }                                // Incrémentation -1 dans objet dislikes
                            })

                            .then(() => { res.status(200).json({ message: 'Dislike retiré' }) })
                            .catch(error => res.status(400).json({ error }))
                    }
                })

                .catch(error => res.status(400).json({ error }))

            break

        default:

        break

    }

}