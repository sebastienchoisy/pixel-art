import React from 'react';
import { useNavigate } from 'react-router-dom';
import { postBoard } from '../services/APIService';
import BoardForm from '../components/forms/board-form/Board-form';
import userProptypes from '../proptypes/user-proptypes';

export default function ScreenBoardForm({ userData }) {
  const navigate = useNavigate();

  const submitCallBack = (formData) => {
    const boardData = {
      pixelBoardname: formData.name,
      nbLines: formData.nbLine,
      nbColumns: formData.nbColumn,
      dateOfClosure: formData.dateOfClosure,
      intervalPixelformData: formData.intervalPixel,
      username: userData.username,
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

ScreenBoardForm.propTypes = {
  userData: userProptypes.isRequired,
};
