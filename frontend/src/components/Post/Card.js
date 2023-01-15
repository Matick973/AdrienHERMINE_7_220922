import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import { UserIdContext } from "../AppContext";
import { AdminContext } from "../AppContext";
import axios from "axios";
import { dateParser } from "../Utils";
import DltButton from "./DltButton";
import LikeButton from "./LikeButton";

import "../../style/Card.css"
import userPicture from "../../images/user.png"
import editPost from "../../images/edit-pen-icon.svg"
import addImage from "../../images/add-image.svg"




const Card = ({ post }) => {

    const uid = useContext(UserIdContext)
    const admin = useContext(AdminContext)

    const [ isLoading, setIsLoading ] = useState(true)              // Tant que posts non chargés = animation de chargment 
    const [ isUid, setIsUid ] = useState(false)                     // Active Option de suppression ou édition (en développement)
    const [ users, setUsers] = useState([])                         // Récupération des infos Users

    const [ updating, setUpdating] = useState(false)

    const [ editMessage, setEditMessage ] = useState(null)
    const [ editPostPicture, setEditPostPicture ] = useState(null)
    const [ file, setFile ] = useState('')

    const editPicture = (event) =>{

        setEditPostPicture(URL.createObjectURL(event.target.files[0]))

        setFile(event.target.files[0])
    }

    const updatePost = () => {

        if (uid === post.userId || admin){

            if (editMessage || editPostPicture) {

                const data = new FormData()
                data.append('message', editMessage)
                if (file) data.append('image', file)
    
                console.log(file)

                axios({ 
                    method: 'put', 
                    url: `${process.env.REACT_APP_API_URL}api/auth/post/${post._id}`,
                    withCredentials: true,
                    data
                })
             
                .then(() => {
                 window.location.reload();
                })
 
                .catch((err) => console.log(err))   
            }
        }
    }

    useEffect(() => {

       if (uid === post.userId) {
            setIsUid(true)
       }

       if(isLoading){

        const fetchUsers = async () => {

            await axios({
                    method: 'get', 
                    url: `${process.env.REACT_APP_API_URL}api/auth/user`,
                    withCredentials: true,
                })

            .then((res) => { 
     
                setUsers(res.data.User)
            })

            .catch((err) => console.log(err, "No Match"))
            
        }

        fetchUsers()
    
    }

       if(post && users) {
        setIsLoading(false)
       }

    },[])

    return (
        <li className="card-container"  >
            
            {isLoading ? ( <div className="lds-ripple"><div></div><div></div></div>)            // Animation de chagement
     
            : (
                
            <div className="post-card">
                <NavLink to='/profil/' className="user-img">
                    <img src={userPicture} alt="Profil"/>
                </NavLink>

                {isUid || admin ? <DltButton post={post}/> : null}
                {isUid || admin ? <div className="updateBtn" onClick={ () => setUpdating(!updating)}> <img src ={editPost} alt=''/> </div> : null }

                <div className="post-card-body">
                    <h5>{dateParser(post.createdAt)}</h5> 
                    <h4>
                        {users.map((user, key) => {

                        if (user._id === post.userId) 
                        return user.pseudo + " ";
                        else return null;
                        })}

                    </h4>

                    {updating === false && <p>{post.message}</p>}
                    {updating && (
                        <div className="post-update">
                            <textarea 
                                defaultValue={post.message}
                                type='text'
                                name="updateMessage"
                                id="updateMessage"
                                onChange={(e) => setEditMessage(e.target.value)} 
                            />
                        </div>
                    )}

                    {updating === false && <>{post.image && (
                    
                    <div className="card-pic">
                        <img src={post.image} aria-hidden alt="une image" />
                    </div>

                    )}</>}

                    {updating && (<div className="add-img-container">
                
                        <img src={addImage} alt="Ajouter"/>

                        <input
                        type="file"
                        name="image"
                        id="post-picture"
                        accept="image/*"
                        onChange={(event) => { editPicture(event)}}
                        />
                        </div>
                    )}
                    
                    {updating && <button className="post-Btn" onClick={ updatePost }> Valider la modifications </button>}
                    
                    <LikeButton post={post}/>
                    <button className="comments-btn" href='#' target="_blank">Lire les commentaires</button>
                </div>
                
            </div>
            )}
        </li>
    )

}

export default Card