import React, { useContext } from "react";
import { UserIdContext } from "../AppContext";
import { AdminContext } from '../AppContext';

import axios from "axios";

const UpdateBtn = ({post}) => {

    const uid = useContext(UserIdContext)
    const admin = useContext(AdminContext)

    const updatePost = async () => {

        if (uid === post.userId || admin){

           await axios({ 
                method: 'put', 
                url: `${process.env.REACT_APP_API_URL}api/auth/post/${post._id}`,
                withCredentials: true,
                
            })
            
            .then(() => {
                window.location.reload();
            })

            .catch((err) => console.log(err))   
        }
    }

    return (
        
        <div className='dltBtn' onClick={updatePost}>X</div>
        
    )

};

export default UpdateBtn