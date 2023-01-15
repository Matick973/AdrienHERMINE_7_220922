import React from "react"
import { useContext } from "react"
import { UserIdContext } from "../components/AppContext"
import Log from "../components/Log"
import ProfilPage from "../components/Profil"
import "../style/Profil.css"

function Profil() {
    
    const uid = useContext(UserIdContext)

    return (
        <div className="profil-page">
            {uid ? (
                <>

                <h1>Page Profil - En développement !</h1> 

                <div className='user-profil'>
                    <ProfilPage/>
                </div>

                </>
            ) : (
            <div className="log-container">
            <Log login={false} signup={true}/>
            </div>
            )}
        </div>
    )
}

export default Profil