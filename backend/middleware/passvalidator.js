const passwordValidator = require('password-validator');

const schemaPassword = new passwordValidator();

schemaPassword
    .is().min(4)                                     // Minimum length 6
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                             // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits()                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123', 'Azerty', 'Qwerty', '1234','123456']); // Blacklist these values

module.exports = (req, res, next) => {

    const bodyPassword = req.body.password
    console.log(bodyPassword)

    if(schemaPassword.validate(bodyPassword)){
        next()
    } else {
        return res.status(400)
        .json({error: 'Mot de passe invalide !'+ schemaPassword.validate(req.body.password, {list: true})})                 // Error 401 Unauthorized
    }
} 