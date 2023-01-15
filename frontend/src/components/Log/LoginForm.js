import React, { useState } from "react"
import axios from 'axios'

const LoginForm = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (event) => {
        event.preventDefault()
        const displayLoginError = document.querySelector(".displayLoginError");

        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}api/auth/user/login/`,
            withCredentials: true,
            data: { email, password },
        })

        .then((response) => {
            if (response.data.error) {
                console.log(response.data.error)
                displayLoginError.innerHTML = response.data.error;
            } else {
                console.log(response)
                window.location = "/newsfeed";
            }
        })

        .catch((error) => {
            if (error.response) {
                displayLoginError.innerHTML = error.response.data.error
                
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message); // quelque chose s’est passé lors de la construction de la requête et cela a provoqué une erreur
            }
            console.log(error.config);
        });

    }

    return (
        <form action="" onSubmit={handleLogin} id="login-form">

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
                placeholder='Mot de Passe'
                onChange={(e) => setPassword(e.target.value)} />

            <br />

            <input type='submit' id='connectionBtn' value='Connexion' />

            <br />

            <div className="displayLoginError">

            </div>

        </form>
    )
}

export default LoginForm