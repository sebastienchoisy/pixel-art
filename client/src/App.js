import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Route, Routes,
} from 'react-router-dom';
import ScreenAccueil from './screens/Screen-accueil';
import ScreenBoard from './screens/Screen-board';
import ScreenProfil from './screens/Screen-profil';
import ScreenLogin from './screens/Screen-login';
import Header from './components/header/Header';

function App() {
  // const [data, setData] = React.useState(null);
  //
  // React.useEffect(() => {
  //   fetch("/api")
  //       .then((res) => res.json())
  //       .then((data) => setData(data.message));
  // }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<ScreenAccueil />} />
          <Route path="/boards" element={<ScreenBoard />} />
          <Route path="/profil" element={<ScreenProfil />} />
          <Route path="/login" element={<ScreenLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
