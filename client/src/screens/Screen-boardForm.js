import React from 'react';
import { useNavigate } from 'react-router-dom';
import { postBoard } from '../services/APIService';
import BoardForm from '../components/forms/board-form/Board-form';

export default function ScreenBoardForm() {
  const navigate = useNavigate();

  const submitCallBack = (formData) => {
    const boardData = {
      pixelBoardname: formData.name,
      nbLines: formData.nbLine,
      nbColumns: formData.nbColumn,
      dateOfClosure: formData.dateOfClosure,
      intervalPixelformData: formData.intervalPixel,
      multipleDrawPixel: formData.multipleDrawPixel,
    };
    postBoard(boardData).then((res) => {
      if (res.data.success) {
        navigate(`/board/${res.data.id}`);
      }
    });
  };
  return (
    <BoardForm submitCallBack={submitCallBack} />
  );
}
