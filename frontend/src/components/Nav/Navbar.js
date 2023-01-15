import React, { useContext, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { UserIdContext } from "../AppContext"
import '../../style/Navbar.css'
import logo from '../../images/Sphere.png'
import Logout from "../Log/Logout"

const NavBar = () => {
    const uid = useContext(UserIdContext)
    const [pseudo, setPseudo] = useState("");
        
    useEffect(() => {

        setPseudo(sessionStorage.getItem("pseudo"));

    }, [uid, pseudo]);

        return (
            <nav className="navbarItems">
                <div className="logo-container">
                    <NavLink to='/' className="nav-link">
                    <div className="logo" >
                        <img src={logo} alt="Logo Groupomania"/>
                        <h3> Groupomania </h3>
                    </div>
                    </NavLink>
                </div>

                {uid ? (
                    <div className="logout-container">
                        <h3> Salut {pseudo}</h3>
                    
                        <NavLink to='/profil' className="nav-link btn">
                        <div className="" >
                            <h4> Mon Profil </h4>
                        </div>
                        </NavLink>

                        <NavLink to='/newsfeed' className="nav-link btn">
                        <div className=""  >
                            <h4> Home </h4>
                        </div>
                        </NavLink>

                        <Logout/>
                    </div>
                ) : (
                    <div>
                        
                    </div>
                )}
            </nav>
        )
}

export default NavBar