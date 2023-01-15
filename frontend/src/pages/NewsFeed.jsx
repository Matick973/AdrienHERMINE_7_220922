import React from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { UserIdContext } from "../components/AppContext"
import Feed from "../components/Post/Feed"
import Home from "./Home"

function NewsFeed () {

    const uid = useContext(UserIdContext)

    useEffect(() => {

    },[])

    return (
        <div className="profil-page">
            {uid ? (
                <>
                <h1>Fil d'actualité </h1>

                <Feed/>

                </>
            ) : (
            <Home/>
            )}
        </div>
    )
}

export default NewsFeed