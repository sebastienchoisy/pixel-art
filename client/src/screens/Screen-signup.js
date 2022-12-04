import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/forms/user-form/User-form';
import { signup } from '../services/APIService';
import { ThemeContext } from '../context/theme';

// Vue correspondante à l'affichaque du form pour s'inscrire
export default function ScreenSignup() {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  // Callback passé au composant enfant pour envoyer les données au serveur
  const submitCallBack = async (formData) => {
    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };
    const resp = await signup(userData);
    if (resp.data.success) {
      navigate('/');
    }
    // TODO Error view?
  };
  return (
    <div className={theme}>
      <UserForm submitCallBack={submitCallBack} />
    </div>
  );
}
