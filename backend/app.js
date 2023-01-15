const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const listEndpoints = require('express-list-endpoints')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const userRoutes = require('./routes/user_route')
const postRoutes = require('./routes/post_route');
const auth = require('./middleware/auth');

// Utilisation de variables d'environnement
const dotenv = require('dotenv').config({ path: './config/.env' })

const app = express();

// Gestionnaire de cookies pour l'authentification
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// mise à disposition du body de tout requete de type 'content-type' (req.body) ex const bodyParser = require('body-parser')
app.use(express.json());

//Connexion MongoDB Atlas (base de données NoSQL)
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/groupomania`,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie'))
    .catch(() => console.log('Connexion à MongoDB échouée'))

//CORS  (système de sécurité qui, par défaut, bloque les appels HTTP entre des serveurs différents)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', true)
    next();
});

//apps(routes posts, authentification et images)

app.use('/images', express.static(path.join(__dirname, 'images')))
app.get('/auth', auth, (req, res) => { res.status(200).send(req.auth.userId)})
app.use('/api/auth/post/', postRoutes)
app.use('/api/auth/user/', userRoutes)

console.log(listEndpoints(app));

module.exports = app; // exportation de l'application vers server