import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import "../../style/Profil.css"
import { AdminContext, UserIdContext } from "../AppContext";
import { dateParser } from '../Utils';

import editProfilBtn from "../../images/edit-pen-icon.svg"
import addImage from "../../images/add-image.svg"
import DltProfilButton from './DltProfilButton';

const ProfilPage = () => {

    const uid = useContext(UserIdContext)
    const admin = useContext(AdminContext)

    const [pseudo, setPseudo] = useState('')
    const [since, setSince] = useState('')
    const [bio, setBio] = useState('')
    const [profilPicture, setProfilPicture] = useState(null)

    const [ updating, setUpdating] = useState(false)

    const [ editBio, setEditBio ] = useState(null)
    const [ editProfilPicture, setEditProfilPicture ] = useState(null)
    const [ file, setFile ] = useState('')

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
                setBio(res.data.User.bio)
                setProfilPicture(res.data.User.image)
            })
    
            .catch((err) => console.log(err, "No Token = No Acces to Users"))   
        }
    
        fetchUser()
    
    }, [uid])

    const cancelUpdate = () =>{
        setEditBio("")
        setEditProfilPicture(null)
        setFile('')
        setUpdating(false)
    }


    const editPicture = (event) =>{

        setEditProfilPicture(URL.createObjectURL(event.target.files[0]))

        setFile(event.target.files[0])
    }

    const updateProfil = () => {

        if (uid || admin){

            if (editBio || editProfilPicture) {

                const data = new FormData()
                data.append('bio', editBio)
                if (file) data.append('image', file)

                axios({ 
                    method: 'put', 
                    url: `${process.env.REACT_APP_API_URL}api/auth/user/${uid}`,
                    withCredentials: true,
                    data
                })
             
                .then((res) => { console.log(res)
                 window.location.reload();
                })
 
                .catch((err) => console.log(err))   
            }
        }
    }



    return(

        <div className="profil-card">
            <div className="profil-card-body">

                {uid || admin ? <div className="profil-updateBtn" onClick={ () => setUpdating(!updating)}> <img src ={editProfilBtn} alt=''/> </div> : null }


                {updating === false && <div className="profil-picture">
                        <img src={profilPicture} aria-hidden alt="une photo de profil" />
                    </div>
                }

                {updating && (<div className="update-picture-container">
                
                    { editProfilPicture ? (
                        <div className="profil-picture-preview">
                        <img src={editProfilPicture} alt=""/>
                        </div>
                    ) : null}

                        <span className='span-input-update'>
                        <img src={addImage} alt="Ajouter" className='icon-addImage'/>

                        <input
                        type="file"
                        name="image"
                        id="profil-picture"
                        accept="image/*"
                        onChange={(event) => { editPicture(event)}}
                        />
                        </span>
                        </div>
                    )}

                <h3>{pseudo}</h3>
                <p>Menbre depuis le {dateParser(since)}</p>
                

                {updating === false && <p>{bio}</p>}
                {updating && (
                        <div className="user-update">
                            <textarea 
                                defaultValue={bio}
                                type='text'
                                name="updateBio"
                                id="updateBio"
                                onChange={(e) => setEditBio(e.target.value)} 
                            />
                        </div>
                )}
                
            </div>

            <div className='updates-btn'>
                {updating ? (<button className="update-btn-check" onClick={ updateProfil }> Valider les modifications </button>) : null}
                {updating ? (<button className="update-btn-cancel" onClick={ cancelUpdate }> Annuler </button>) : null}
            </div>


            {!admin ? (<div className="disable-btn"><DltProfilButton/></div>) : null}


        </div>
        
    )

}

export default ProfilPage