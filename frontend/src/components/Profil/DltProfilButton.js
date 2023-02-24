import React, { useContext, useState } from "react";
import { UserIdContext } from "../AppContext";
import { AdminContext } from '../AppContext';
import "../../style/PopupDlt.css"

import axios from "axios";

const DltProfilButton = () => {

    const uid = useContext(UserIdContext)
    const admin = useContext(AdminContext)

    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
        console.log(modal)
    }


    const deleteUser = async () => {

        if (uid || admin){

           await axios({ 
                method: 'delete', 
                url: `${process.env.REACT_APP_API_URL}api/auth/user/${uid}`,
                withCredentials: true
            })
            
            .then(() => {
                window.location.reload();
            })

            .catch((err) => console.log(err))   
        }
    }

    return (

    <>
        <button onClick={toggleModal}> Désactiver mon compte !</button>
        
        {modal ? (
            
                <div onClick={toggleModal} className="overlay">
                    <form className="modal-content">
                        <span onClick={toggleModal} className="close-modal" title="Close Modal">&times;</span>
                    
                        <div className="container">
                            <h3>Supprimer le compte</h3>
                            <p>Veux-tu vraiment nous quitter ?</p>

                            <div className="choiceBtn">
                                <button type="button" id="modalCancelBtn" onClick={toggleModal}>Annuler</button>
                                <button type="button" id="modalDeleteBtn" onClick={deleteUser}>Supprimer</button>
                            </div>
                        </div>
                    </form>
                </div>    
            
        ) : null}
    </>


    )

};

export default DltProfilButton