import React from "react";
import axios from "axios";
import cookie from "js-cookie"

const Logout = () => {

    const removeCookie = (key) =>{
        if (window !== "undefined"){
            cookie.remove(key, {expires: 1})
        }
    }

   const logout = () =>{
    axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}api/auth/user/logout`,
        withCredentials: true,
    })
        .then(() => {removeCookie('access_token'); 
            sessionStorage.removeItem("userID");
            sessionStorage.removeItem("pseudo");})
        .catch((error) => console.log(error))

    window.location = '/'
   }

    return (
    <button id='logoutBtn' onClick={logout}>
        Déconnexion
    </button>
)
}

export default Logout;