/*---------Comments road section-----------*/

// Routes Comments

router.patch("/create-com/:id", auth, postCtrl.createCom)
router.patch("/modify-com/:id", auth, postCtrl.modifyCom)
router.patch("/delete-com/:id", auth, postCtrl.deleteCom)

/*---------Comments controller section-----------*/

exports.createCom = (req, res, next) => {

    Post.findOne({ _id: req.params.id })

        .then((addComment) => {

            if (addComment.userId != req.auth.userId) {

                res.status(401).json({ message: 'Not authorized' });

            } else {

                Post.updateOne({ "_id": (req.params.id) },
                    {
                        $push:
                        {
                            comments:
                            {
                                userId: req.auth.userId,
                                userPseudo: req.body.userPseudo,
                                text: req.body.text,
                                timestamps: new Date().getTime()
                            }
                        }
                    },
                    { new: true })
                    //imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

                    .then(() => res.status(200).json({ addComment }))
                    .catch(error => res.status(401).json({ error }))
            }
        })
        .catch(error => res.status(400).json({ error }))
};

exports.modifyCom = (req, res, next) => {
    
    Post.findOne({ _id: req.params.id })

    .then((modifyComment) => {

        if (modifyComment.userId != req.auth.userId) {

            res.status(401).json({ message: 'Not authorized' });

        } else {
                
            console.log(locatedComment)
            console.log(modifyComment.comments)
            console.log(req.body.commentId)
            const locatedComment = modifyComment.comments.find((comment) =>{
                comment._id.equals(req.body.commentId)
                console.log("const comment",comment)
            
            })
            
            Post.updateOne({ "_id": (req.body.commentId) },

                    {
                        $push:
                        {
                            comments:
                            {
                            
                                text: req.body.text,
                                
                            }
                        }
                    },
                    { new: true })

                    .then(() => res.status(200).json({ modifyComment }))
                    .catch(error => res.status(401).json({ error }))
        }
    })    
        
    .catch((error) => res.status(400).json(error))
}

exports.deleteCom = (req, res, next) => {
    Post.findOne({ _id: req.params.id })

        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }))
};