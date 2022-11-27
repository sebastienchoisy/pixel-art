import './App.css';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {
  Route, Routes, Navigate, useLocation,
} from 'react-router-dom';
import ScreenAccueil from './screens/Screen-accueil';
import ScreenBoard from './screens/Screen-board';
import ScreenProfile from './screens/Screen-profile';
import ScreenLogin from './screens/Screen-login';
import Header from './components/header/Header';
import ScreenSignup from './screens/Screen-signup';
import { getUserInfo } from './services/APIService';

function App() {
  const location = useLocation();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    getUserInfo().then((userResp) => {
      if (userResp.success) {
        setUser(userResp.user);
      }
    });
  }, [location]);

  return (
    <div className="App">
      <Header username={user ? user.username : undefined} />
      <Routes>
        <Route exact path="/" element={<ScreenAccueil />} />
        <Route path="/boards" element={<ScreenBoard />} />
        <Route path="/profil" element={user ? <ScreenProfile userData={user} /> : <Navigate replace to="/" />} />
        <Route path="/login" element={<ScreenLogin />} />
        <Route path="/signup" element={!user ? <ScreenSignup /> : <Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
