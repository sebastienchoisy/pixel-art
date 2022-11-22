import './App.css';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Route, Routes, Navigate, useLocation,
} from 'react-router-dom';
import ScreenAccueil from './screens/Screen-accueil';
import ScreenBoard from './screens/Screen-board';
import ScreenProfil from './screens/Screen-profil';
import ScreenLogin from './screens/Screen-login';
import Header from './components/header/Header';
import ScreenSignup from './screens/Screen-signup';
import { getUserInfoWithCookie } from './services/APIService';

function App() {
  const location = useLocation();
  const [user, setIsUser] = useState(undefined);

  useEffect(() => {
    const response = getUserInfoWithCookie();
    if (response.success) {
      setIsUser(getUserInfoWithCookie().user);
    }
  }, [location]);

  return (
    <div className="App">
      <Header username={user ? user.username : undefined} />
      <Routes>
        <Route exact path="/" element={<ScreenAccueil />} />
        <Route path="/boards" element={<ScreenBoard />} />
        <Route path="/profil" element={user ? <ScreenProfil /> : <Navigate replace to="/" />} />
        <Route path="/login" element={<ScreenLogin />} />
        <Route path="/signup" element={!user ? <ScreenSignup /> : <Navigate replace to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
