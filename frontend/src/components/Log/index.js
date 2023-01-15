import React, { useState } from "react"
import '../../style/Home.css'
import SignupForm from "./SignupForm"
import LoginForm from "./LoginForm"


const Log = (props) => {

     const [loginModal, setLoginModal] = useState(props.login);
     const [signupModal, setSignupModal] = useState(props.signup);
   
    const handleModals = (event) => {
        if (event.target.id === "login") {
            setSignupModal(false);
            setLoginModal(true);
        } else if (event.target.id === "signup") {
            setSignupModal(true);
            setLoginModal(false);
        };
    };

    return (
        <div className="connection-form">

            <div className="form-container">
                <div className="choice-connection">
                    <ul>
                        <li id="login" onClick={handleModals} className={loginModal ? "active-btn" : null}>Se connecter</li>
                        <li id="signup" onClick={handleModals} className={signupModal ? "active-btn" : null}>S'inscrire</li>
                    </ul>
                </div>
                <div>
                    {loginModal && <LoginForm />}
                    {signupModal && <SignupForm />}
                </div>
            </div>

        </div>
    );
};

export default Log