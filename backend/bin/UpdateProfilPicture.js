import React from "react";
import { useState } from "react";

const UploadPicture = () =>{

    const [profilPicture, setProfilPicture] = useState(null)
    const [file, setFile ] = useState('')


    const handlePicture = (event) =>{
        setProfilPicture(URL.createObjectURL(event.target.files[0]))
        
        setFile(event.target.files[0])
        
    }

    return (

        <div className="add-img-container">
                

                        <input
                        type="file"
                        name="image"
                        id="post-picture"
                        accept="image/*"
                        onChange={(event) => { handlePicture(event)}}
                        />
                        </div>

    )

}