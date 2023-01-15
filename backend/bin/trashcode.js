exports.likePost = async (req, res, next) => {                                      // Fonction asynchrone car plusieur requete en meme temps
    const UserID = req.body.userId
    await Post.findOne({ _id: req.params.id })                                       // Ciblage de l'élément
    await req.body.userId
    console.log(req.params.id)
    console.log(req.body.userId)

    switch (req.body.like) {

        case 1:                                                                     // Si like = 1 l'utilisateur aime le post, like enregistré si "userID" n'est pas présent dans le tableau [usersLiked]

            await User.updateOne({ id: req.body.userId },
                {
                    $push: { likes: req.params.id }                                      // Ajout Id du post dans le tableau [likes] de User
                }),

                await Post.updateOne({ _id: req.params.id },
                    {
                        $push: { usersLiked: req.body.userId },                            // Ajout "userId" dans le tableau [usersLiked] du Post
                        $inc: { likes: 1 }                                                  // Incrémentation + 1 dans objet likes
                    })

                    .then(() => { res.status(200).json({ message: 'Like + 1' }) })
                    .catch(error => res.status(400).json({ error }))

            break

        case -1:                                                                    //Si like = -1 l'utilisateur n'aime pas le post, dislike enregistré si "userID" n'est pas présent dans le tableau [usersDisliked]

            await User.updateOne({ id: req.body.userId },
                {
                    $push: { dislikes: req.params.id }                                  // Ajout Id du post dans le tableau [likes] de User
                }),

                await Post.updateOne({ _id: req.params.id },
                    {
                        $push: { usersDisliked: req.body.userId },                         // Ajout "userId" dans le tableau [usersDisliked]
                        $inc: { dislikes: 1 }                                              // Incrémentation + 1 dans objet dislikes
                    })

                    .then(() => { res.status(200).json({ message: 'Dislike + 1' }) })
                    .catch(error => res.status(400).json({ error }))

            break

        case 0:                                                                     //Si like = 0 l'utilisateur annule le like/dislike de l'utilisateur

                    if (Post.usersLiked.indexOf(UserID) !== -1) {                // Condition : Si tableau [userLiked] contient déja "userId" alors exécution.
                        //console.log(Post.usersLiked.indexOf(UserID) !==-1)

                        User.updateOne({ id: req.body.userId },
                            console.log("req params id", req.params.id),
                            {
                                $pull: { likes: req.params.id },
                            })

                            Post.updateOne({ _id: req.params.id },
                            console.log("reqbodyuserid", req.body.userId),
                            {
                                $pull: { usersLiked: req.body.userId },                        // Retrait "userId" dans le tableau [usersLiked]
                                $inc: { likes: -1 },                                             // Incrémentation -1 dans objet likes
                            })

                            .then(() => { res.status(200).json(PostUnlike) })
                            .catch(error => res.status(400).json({ error }))
                    }

                    else if (Post.usersDisliked.indexOf(UserID) !== -1) {            // Condition : Si tableau [userLiked] contient déja "userId" alors exécution.

                        User.updateOne({ id: req.body.userId },
                            {
                                $pull: { dislikes: req.params.id },
                            })

                            Post.updateOne({ _id: req.params.id },
                            {
                                $pull: { usersDisliked: req.body.userId },                     // Retrait "userId" dans le tableau [usersDisliked]
                                $inc: { dislikes: -1 },                                          // Incrémentation -1 dans objet dislikes
                            })

                            .then(() => { res.status(200).json({ message: 'Dislike retiré' }) })
                            .catch(error => res.status(400).json({ error }))
                    }

            break

        default:

            break

    }

}


exports.likePost = async (req, res, next) => {
    console.log(req.body.userId)
    console.log(req.params.id)

        Post.findOne({ _id: req.params.id })
            .then((Post) => {
    
                if (!Post.usersLiked.includes(req.body.userId)) {
                    Post.updateOne({ _id: req.params.id },
                        {
                            $inc: { likes: 1 },
                            $addtoset: { usersLiked: req.body.userId }
                        })
    
                        .then(() => res.status(200).json({ message: 'User ajouté au tableau like et like pris en compte' }))
                        .catch(error => res.status(403).json({ error }))
                }
                else if (Post.usersLiked.includes(req.body.userId)) {
                    Post.updateOne({ _id: req.params.id },
                        {
                            $inc: { likes: -1 },
                            $pull: { usersLiked: req.body.userId }
                        })
    
                        .then(() => res.status(200).json({ message: 'User supprimé du tableau like et dislike pris en compte' }))
                        .catch(error => res.status(403).json({ error }))
                }
            })
    
            .catch((error) => {
                res.status(500).json({ error });
            });
    };

    exports.signInErrors  = (err) => {
        let errors = {email: '', password:''}
    
        if (err.message.includes('email'))
            errors.email = "Email inconnu !"
    
        if (err.message.includes('password'))
            errors.password = "Mot de passe incorrect !"
            
    return errors
    }

                
    for (let g = 0, h = res.data.User.length; g < h; g++) {
        if (res.data.User[g]._id === post.userId) {
            
            setAutor = {
            "id" : post._id,
            "pseudo" : res.data.User[g].pseudo,
            }
            
        }

    console.log(res.data.User[g].pseudo)
    console.log(post.userId) 
    }

//setAutor(res.data);