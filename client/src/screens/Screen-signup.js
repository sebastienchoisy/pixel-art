import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/forms/signup-form/User-form';
import { signup } from '../services/APIService';
import { ThemeContext } from '../context/theme';

export default function ScreenSignup() {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
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
