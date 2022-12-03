import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../components/forms/signup-form/User-form';
import { signup } from '../services/APIService';

export default function ScreenSignup() {
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
    <UserForm submitCallBack={submitCallBack} />
  );
}
