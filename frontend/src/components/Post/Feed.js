import React, { useEffect, useState } from 'react';
import axios from "axios";
import Card from './Card'
import AddPost from './AddPost';

const Feed = () => {
    const [loadPost, setLoadPost] = useState(true)
    const [posts, setPosts] = useState([])

    useEffect(() => {

        const fetchPost =  () => {

            if (loadPost) {
            
                axios({
                    method: 'get', 
                    url: `${process.env.REACT_APP_API_URL}api/auth/post`,
                    withCredentials: true,
                })

                .then((res) => { /*console.log(res);*/
                
                setPosts(res.data);
                
                })

                .catch((err) => console.log(err, "No Token = No Posts"))

                setLoadPost(false)
            }
        }

        fetchPost()

    }, [loadPost])

    return(

        <div className='feed-container'>
            <div className='new-post-section'>
                <AddPost/>
            </div>
            <ul>
            {posts.map((post, key) => {
                return <Card post={post} key={post._id} />;
            })}
            </ul>
        </div>

    )

}

export default Feed