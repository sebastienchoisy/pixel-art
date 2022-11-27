import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createBoard } from '../services/APIService';
import BoardForm from '../components/forms/board-form/Board-form';

export default function ScreenBoardForm() {
  const navigate = useNavigate();
  const submitCallBack = (formData) => {
    console.log(formData);
    if (createBoard(formData).success) {
      navigate('/boards');
    }
    // TODO Error view?
  };
  return (
    <BoardForm submitCallBack={submitCallBack} />
  );
}
