import React, { useContext, useEffect, useState } from "react";
import { UserIdContext } from "../AppContext";
import axios from "axios";
import likeIcon from '../../images/like-icon.svg';
import likeIconFill from '../../images/like-icon-fill.svg';
//import dislikeIcon from '../../images/dislike-icon.svg';
//import dislikeIconFill from '../../images/dislike-icon-fill.svg';

const LikeButton = ({post}) => {

    const uid = useContext(UserIdContext)
    const[ liked, setLiked ] = useState(false)
    const[ likesNumber, setLikesNumber ] = useState('')

    useEffect(()=> {

        if (post.likers.includes(uid)){
            setLiked(true)
        }

        setLikesNumber(post.likes)

    }, [uid, post.likers, liked, likesNumber, post.likes])

    const like = () =>{
        
        axios({ 
            method: 'patch', 
            url: `${process.env.REACT_APP_API_URL}api/auth/post/like/${post._id}`,
            withCredentials: true,
            data : {
                userId : uid,                   // Ajout "userId" dans le tableau [likers]
                like: 1
            }
        })
        
        .then((res) => console.log(res), setLiked(true),

        window.location.reload()

        )

        .catch((err) => console.log(err))

    }

    const unlike = () =>{

        axios({ 
            method: 'patch', 
            url: `${process.env.REACT_APP_API_URL}api/auth/post/like/${post._id}`,
            withCredentials: true,
            data : {
                userId: uid,                  // Retrait "userId" dans le tableau [likers]
                like: 0 
            }
        })

        .then((res) => console.log(res), setLiked(false),
        
        window.location.reload()

        )

        .catch((err) => console.log(err))
    }

    return (
        <div className='like-container'>
        { uid && liked === false && (
            <img src={likeIcon} onClick={like} className='like-unfilled' alt='Like'/>
        )}
        { uid && liked === true && (
            <img src={likeIconFill} onClick={unlike} className='like-filled' alt='Like Fill'/>
        )}

            <div className="counter"> 
                {likesNumber}
            </div>
        </div>
    )
}

export default LikeButton