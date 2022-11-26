import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../components/forms/signup-form/Signup-form';
import { signup } from '../services/APIService';

export default function ScreenSignup() {
  const navigate = useNavigate();
  const submitCallBack = (formData) => {
    if (signup(formData).success) {
      navigate('/');
    }
    // TODO Error view?
  };
  return (
    <SignupForm submitCallBack={submitCallBack} />
  );
}
