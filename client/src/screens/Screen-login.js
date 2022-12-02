import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/forms/login-form/Login-form';
import { login } from '../services/APIService';

export default function ScreenLogin() {
  const navigate = useNavigate();
  const submitCallBack = async (formData) => {
    const response = await login(formData);
    if (response.data.success) {
      navigate('/');
    }
    return false;
  };
  return (
    <LoginForm submitCallBack={submitCallBack} />
  );
}
