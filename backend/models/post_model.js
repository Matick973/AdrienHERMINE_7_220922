const mongoose = require('mongoose') //npm install mongoose

const postSchema = mongoose.Schema({
    userId: { type: String, require: true },
    message: { type: String, maxlength: 600, trim: true },
    image : { type: String },
    likes: { type: Number, require: true, default: 0 }, // default 0 pour éviter Bug "NaN" avant like
    dislikes: { type: Number, require: true, default: 0 }, // default 0 pour éviter Bug "NaN" avant dislike
    likers: { type: [String], require: true },
    dislikers: { type: [String], require: true },
    //video: { type: String },
    //comments: { type: [{ userId: String, userPseudo: String, text: String, timestamps: Number }], require: true },
},
    { timestamps: true }
)

module.exports = mongoose.model('Post', postSchema)