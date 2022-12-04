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

  // CallBack passé au header en cas de changement de theme
  const handleClick = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // On vérifie si l'utilisateur est connecté grâce au cookie à chaque changement de vue
  useEffect(() => {
    getUserInfo().then((userResp) => {
      if (userResp.data.success) {
        setUser(userResp.data.user);
      } else {
        setUser(null);
      }
      // On récupère le theme habituel de l'utilisateur
      if (localStorage.getItem('theme')) {
        setTheme(localStorage.getItem('theme'));
      }
    });
  }, [location]);

  return (
    <div className="App">
      {/* Mise en place du context pour le theme */}
      <ThemeContext.Provider value={theme}>
        <Header username={user ? user.username : undefined} changeTheme={handleClick} />
        {/* Mise en place du router, on autorise ou non certaines routes
        si l'utilisateur est connecté ou pas */}
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
