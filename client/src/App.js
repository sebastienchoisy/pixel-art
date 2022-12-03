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
import ScreenBoardForm from './screens/Screen-boardForm';
import ScreenBoards from './screens/Screen-boards';
import { ThemeContext } from './context/theme';

function App() {
  const location = useLocation();
  const [user, setUser] = useState(undefined);
  const [theme, setTheme] = useState('light');
  const handleClick = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    getUserInfo().then((userResp) => {
      if (userResp.data.success) {
        setUser(userResp.data.user);
      } else {
        setUser(null);
      }
      setTheme(localStorage.getItem('theme'));
    });
  }, [location]);

  return (
    <div className="App">
      <ThemeContext.Provider value={theme}>
        <Header username={user ? user.username : undefined} changeTheme={handleClick} />
        <Routes>
          <Route exact path="/" element={<ScreenAccueil />} />
          <Route path="/board/:id" element={<ScreenBoard />} />
          <Route path="/boards" element={<ScreenBoards isLogged={!!user} />} />
          <Route path="/boardform" element={user ? <ScreenBoardForm /> : <Navigate replace to="/" />} />
          <Route path="/profil" element={user ? <ScreenProfile userData={user} /> : <Navigate replace to="/" />} />
          <Route path="/login" element={<ScreenLogin />} />
          <Route path="/signup" element={!user ? <ScreenSignup /> : <Navigate replace to="/" />} />
        </Routes>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
