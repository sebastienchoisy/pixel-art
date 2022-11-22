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
import ScreenSignin from './screens/Screen-signin';
import { getUserInfoWithCookie } from './services/APIService';
import { ThemeContext, themes } from './context/ThemeContext';

function App() {
  const location = useLocation();
  const [user, setIsUser] = useState(undefined);
  const [theme, setTheme] = useState(themes.light);
  const handleClick = () => {
    setTheme((themeValue) => (themeValue === themes.light ? themes.dark : themes.light));
  };

  useEffect(() => {
    const response = getUserInfoWithCookie();
    if (response.success) {
      setIsUser(getUserInfoWithCookie().user);
    }
  }, [location]);

  return (
    <div className="App">
      <ThemeContext.Provider value={theme}>
        <Header username={user ? user.username : undefined} changeTheme={handleClick} />
        <Routes>
          <Route exact path="/" element={<ScreenAccueil />} />
          <Route path="/boards" element={<ScreenBoard />} />
          <Route path="/profil" element={user ? <ScreenProfil /> : <Navigate replace to="/" />} />
          <Route path="/login" element={<ScreenLogin />} />
          <Route path="/signin" element={!user ? <ScreenSignin /> : <Navigate replace to="/" />} />
        </Routes>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
