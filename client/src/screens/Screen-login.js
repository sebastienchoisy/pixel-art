import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/forms/login-form/Login-form';
import { login } from '../services/APIService';
import { ThemeContext } from '../context/theme';

// Vue correspondante à l'affichaque du form pour se connecter
export default function ScreenLogin() {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);

  // Callback passé au composant enfant pour envoyer les données au serveur
  const submitCallBack = async (formData) => {
    const userData = {
      username: formData.username,
      password: formData.password,
    };
    const response = await login(userData);
    if (response.data.success) {
      navigate('/');
    }
    return true;
  };
  return (
    <div className={theme}>
      <LoginForm submitCallBack={submitCallBack} />
    </div>
  );
}
