import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserIdContext } from "../AppContext";
import "../../style/NewsFeed.css"
import userPicture from "../../images/user.png"
import addImage from "../../images/add-image.svg"
import axios from "axios";

const AddPost = () =>{
    
    const uid = useContext(UserIdContext)
    const [message, setMessage] = useState("")
    const [postPicture, setPostPicture] = useState(null)
    const [file, setFile ] = useState('')

    const handlePicture = (event) =>{
        setPostPicture(URL.createObjectURL(event.target.files[0]))
        
        setFile(event.target.files[0])
        
    }

    const handlePost = () =>{
        if (message || postPicture) {

            const data = new FormData()
            data.append('userId', uid)
            data.append('message', message)
            if (file) data.append('image', file)

            console.log(file)

            axios({ 
                method: 'post', 
                url: `${process.env.REACT_APP_API_URL}api/auth/post/`,
                withCredentials: true,
                data
            })

            .then(() => {window.location.reload()})

            .catch((err) => console.log(err)) 

        }else{

            alert('Aucun message renseigné !')

        }
    }

    const cancelPost = () =>{
        setMessage("")
        setPostPicture(null)
        setFile('')
    }

    return (

        <>

            <div className="header-form-container">

                <NavLink to='/profil' className="user-img">
                        <img src={userPicture} alt="Profil"/>
                </NavLink>
            </div>

            <div className="body-form-container">
                <textarea 
                    type='message'
                    name="message"
                    id="message"
                    value={message}
                    placeholder='Quoi de neuf ?'
                    onChange={(e) => setMessage(e.target.value)} 
                />

                { postPicture ? (
                    <div className="picture-preview">
                        <img src={postPicture} alt=""/>
                    </div>
                ) : null}

            </div>

            <div className="footer-form-container">

                <div className="add-img-container">
                
                    <img src={addImage} alt="Ajouter"/>

                    <input
                    type="file"
                    name="image"
                    id="post-picture"
                    accept="image/*"
                    onChange={(event) => { handlePicture(event)}}
                    />
                </div>

                {message || postPicture ? (
                <button id='cancel-Btn' onClick={ cancelPost }>
                    Annuler
                </button>
                ) : null}

                <button id='post-Btn' onClick={ handlePost }>
                    Poster
                </button>
                
            </div>

        </>
    )
}

export default AddPost