import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { postBoard } from '../services/APIService';
import BoardForm from '../components/forms/board-form/Board-form';
import { ThemeContext } from '../context/theme';

export default function ScreenBoardForm() {
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);

  const submitCallBack = (formData) => {
    const boardData = {
      pixelBoardname: formData.name,
      nbLines: formData.length,
      nbColumns: formData.length,
      dateOfClosure: formData.dateOfClosure,
      intervalPixel: formData.intervalPixel,
      multipleDrawPixel: formData.multipleDrawPixel,
    };
    postBoard(boardData).then((res) => {
      if (res.data.success) {
        navigate(`/board/${res.data.id}`);
      }
    });
  };
  return (
    <div className={theme}>
      <BoardForm submitCallBack={submitCallBack} />
    </div>
  );
}
