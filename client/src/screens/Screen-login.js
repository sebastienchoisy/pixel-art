import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/forms/login-form/Login-form';
import { login } from '../services/APIService';

export default function ScreenLogin() {
  const navigate = useNavigate();
  const submitCallBack = (formData) => {
    if (login(formData).success) {
      navigate('/');
    } else {
      return true;
    }
    return false;
  };
  return (
    <LoginForm submitCallBack={submitCallBack} />
  );
}
