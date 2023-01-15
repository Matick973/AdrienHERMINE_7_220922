import React, { useEffect, useState } from 'react';
import Routes from './components/Routes';
import { UserIdContext } from './components/AppContext';
import { AdminContext } from './components/AppContext';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { oneUser } from './feature/user.slice';


function App() {
  
  const dispatch = useDispatch()
  const [ uid, setUid ] = useState(null)
  const [ isAdmin, setIsAdmin ] = useState(false)                 //Active les options d'administrateurs 
  
  useEffect(() => {

    const fetchUserIdToken = async () => {
      
      await axios({
        method: 'get', 
        url: `${process.env.REACT_APP_API_URL}auth`,
        withCredentials: true,
      })
      
      .then((res) => { /*console.log(res)*/; setUid(res.data);
      
        if(uid){
    
          axios({
            method: 'get', 
            url: `${process.env.REACT_APP_API_URL}api/auth/user/${uid}`,
            withCredentials: true,
          })
            .then((res) => { /*console.log(res);*/ dispatch(oneUser(res.data))
            
              sessionStorage.setItem("userID", res.data.User._id);
              sessionStorage.setItem("pseudo", res.data.User.pseudo);
            
            if (res.data.User.admin === true) {
              setIsAdmin(true)
            }

            })
          .catch((err) => console.log(err, "No Token = No User"))
        
        } 
      
      })

      .catch((err) => console.log(err, "Undefined Token"))
    }

    fetchUserIdToken()

  })

  return (
    <UserIdContext.Provider value={uid}>
      <AdminContext.Provider value={isAdmin}>
        <Routes />
      </AdminContext.Provider>
    </UserIdContext.Provider>

  )
}

export default App;