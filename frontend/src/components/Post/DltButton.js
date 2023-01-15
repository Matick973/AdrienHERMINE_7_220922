import React, { useContext } from "react";
import { UserIdContext } from "../AppContext";
import { AdminContext } from '../AppContext';

import axios from "axios";

const DltButton = ({post}) => {

    const uid = useContext(UserIdContext)
    const admin = useContext(AdminContext)

    const deletePost = async () => {

        if (uid === post.userId || admin){

           await axios({ 
                method: 'delete', 
                url: `${process.env.REACT_APP_API_URL}api/auth/post/${post._id}`,
                withCredentials: true
            })
            
            .then(() => {
                window.location.reload();
            })

            .catch((err) => console.log(err))   
        }
    }

    return (
        
        <div className='dltBtn' onClick={deletePost}>X</div>
        
    )

};

export default DltButton