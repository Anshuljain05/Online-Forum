import React, { useState, useEffect } from 'react';
import AuthContext from './Contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Components/Navbar';

import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import CreateCategory from './Pages/Category/CreateCategory';
import BrowseCategories from './Pages/Category/BrowseCategories';
import ShowCategory from './Pages/Category/ShowCategory';
import CreateForum from './Pages/Forum/CreateForum';
import ShowForum from './Pages/Forum/ShowForum';
import CreateThread from './Pages/Thread/CreateThread';
import ShowThread from './Pages/Thread/ShowThread';
import UpcomingFeatures from './Pages/UpcomingFeatures';
import ContactUs from './Pages/ContactUs';

function App() {
  const [user, setUser] = useState(null);
  const [isInitiated, setIsInitiated] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get('/api/auth/init', {params: {token}});
    const {user} = response.data;
    setUser(user);
    setIsInitiated(true);
  }

  const handleLogout = () => {
    setUser(null);
    localStorage.setItem("token", null);
  }

  return (
    <div>
      {isInitiated && (
        <AuthContext.Provider value={{user, setUser, handleLogout}}>
          <Router>
            <Navbar />
            <Routes>
              <Route exact path='/' element={<Home />} />            
              <Route exact path='/about-us' element={<AboutUs />} />            
              <Route exact path='/upcoming-features' element={<UpcomingFeatures />} />            
              <Route exact path='/contact-us' element={<ContactUs />} />            
              <Route exact path='/auth/login' element={!user ? <Login /> : <Navigate to='/' /> } />
              <Route exact path='/auth/register' element={!user ? <Register /> : <Navigate to='/' /> } />
              <Route exact path='/category/create' element={user ? <CreateCategory /> : <Navigate to='/auth/login' /> } />
              <Route exact path='/category/:id' element={<ShowCategory />} />
              <Route exact path='/category' element={<BrowseCategories />} />
              <Route exact path='/forum/create/:id' element={user ? <CreateForum /> : <Navigate to='/auth/login' /> } />
              <Route exact path='/forum/:id' element={<ShowForum />} />
              <Route exact path='/thread/create/:id' element={user ? <CreateThread /> : <Navigate to='/auth/login' /> } />
              <Route exact path='/thread/:id' element={<ShowThread />} />
            </Routes>
          </Router>
        </AuthContext.Provider>

        
      )}
    </div>
  );
}

export default App;
