import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import "../../style/Profil.css"
import userPicture from "../../images/user.png"
import { UserIdContext } from "../AppContext";
import { dateParser } from '../Utils';


const ProfilPage = () => {

    const uid = useContext(UserIdContext)
    const [pseudo, setPseudo] = useState('')
    const [since, setSince] = useState('')

    useEffect(() => {

    const fetchUser = async () => {

        await axios({
            method: 'get', 
            url: `${process.env.REACT_APP_API_URL}api/auth/user/${uid}`,
            withCredentials: true,
        })

        .then((res) => { console.log(res);
            
            setPseudo(res.data.User.pseudo);
            setSince(res.data.User.createdAt);
        })

        .catch((err) => console.log(err, "No Token = No Acces to Users"))   
    }

    fetchUser()

    }, [uid])

    return(

        <div className="profil-card">
            <div className="profil-card-body">
                <img src={userPicture} alt=""/>
                <h3>{pseudo}</h3>
                <p>Menbre depuis le {dateParser(since)}</p>
                
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing 
                    elit, sed do eiusmod tempor incididunt ut labore 
                    et dolore magna aliqua. Ut enim ad minim veniam, 
                    quis nostrud exercitation ullamco laboris nisi ut.
                </p>
                
            </div>
            <div className="followe-me">
                <button>Follow Me !</button>
            </div>
        </div>
        
    )

}

export default ProfilPage