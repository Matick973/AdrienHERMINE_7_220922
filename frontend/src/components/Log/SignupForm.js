import axios from "axios"
import React, { useState } from "react"
import LoginForm from "./LoginForm"

const SignupForm = () => {
    const [formSubmit, setFormSubmit] = useState(false)
    const [pseudo, setPseudo] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    
    const handleSignup = (event) => {
        event.preventDefault()

        const displaySignupError = document.querySelector(".displaySignupError");
        const displaySignupErrorPseudo = document.querySelector(".displaySignupErrorPseudo");               //AFFICHE DES ERREURS DU BACKEND
        const displaySignupErrorEmail = document.querySelector(".displaySignupErrorEmail");
        const displaySignupErrorPassword = document.querySelector(".displaySignupErrorPassword");

        displaySignupError.innerHTML = "";
        displaySignupErrorPseudo.innerHTML = "";                                                            //INITILISATION OU REINITILISATION DE LA DIV
        displaySignupErrorEmail.innerHTML = "";
        displaySignupErrorPassword.innerHTML = "";

        if (password !== passwordCheck) {
            displaySignupError.innerHTML = 'Les mots de passes doivent être identique !'
        } else {

            axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}api/auth/user/signup`,
                withCredentials: true,
                data: { pseudo, email, password },
            })

            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error)
                    displaySignupError.innerHTML = response.data.error;
                        
                } else {
                    console.log(response)
                    setFormSubmit(true)
                }
            })

            .catch((error) => {
                if (error.response) {

                    displaySignupError.innerHTML = error.response.data.error;
                
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message); // quelque chose s’est passé lors de la construction de la requête et cela a provoqué une erreur
                }
                console.log(error.config);
            });
        }
    }

    return (
        <>
        {formSubmit ? (
            
            <>
            <LoginForm />
            <h4 className="success">Bienvenue, Connectez-vous !</h4>
            </>
        ) : (

        <form action="" onSubmit={handleSignup} id="login-form">

            <label htmlFor="pseudo"></label>
            <input
                type='text'
                name="pseudo"
                id="pseudo"
                value={pseudo}
                placeholder='Votre pseudo'
                onChange={(e) => setPseudo(e.target.value)} />

            <br />
            <label htmlFor="email"></label>
            <input
                type='text'
                name="email"
                id="email"
                value={email}
                placeholder='Votre e-mail'
                onChange={(e) => setEmail(e.target.value)} />

            <br />
            <label htmlFor="password"></label>
            <input
                type='password'
                name="password"
                id="password"
                value={password}
                required={true}
                placeholder='Mot de Passe'
                onChange={(e) => setPassword(e.target.value)} />

            <br />
            <label htmlFor="passwordCheck"></label>
            <input
                type='password'
                name="password"
                id="passwordCheck"
                value={passwordCheck}
                required={true}
                placeholder='Confirmation du Mot de Passe'
                onChange={(e) => setPasswordCheck(e.target.value)} />

            <br />
            <input type='submit' id='subscribeBtn' value='Inscription' />

            <br />

            <div className="displaySignupError"></div>
            <div className="displaySignupErrorPseudo"></div>
            <div className="displaySignupErrorEmail"></div>
            <div className="displaySignupErrorPassword"></div>

        </form>
        )}
        </>
    )

}

export default SignupForm