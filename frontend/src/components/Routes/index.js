import React from 'react';
import NavBar from '../Nav/Navbar';
import {
      BrowserRouter as Router,
      Navigate,
      Route,
      Routes,
} from 'react-router-dom';

import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import NewsFeed from '../../pages/NewsFeed';

function Navigation() {
      return (
            <Router>
                  <NavBar/>
                  <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/newsfeed" element={<NewsFeed/>} />,
                        <Route path="/profil/" element={<Profil/>} />,
                        <Route path="*" element={<Navigate replace to="/" />} />
                  </Routes>
            </Router>
      )
}

export default Navigation

//https://stackoverflow.com/questions/63690695/react-redirect-is-not-exported-from-react-router-dom