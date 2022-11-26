import React, { useState } from 'react';
import PropTypes from 'prop-types';
import heart from '../../../assets/heart.png';
import FavoriteColor from './FavoriteColor/FavoriteColor';
import './ColorPicker.css';

export default function ColorPicker({ parentCallback }) {
  const [color, setColor] = useState('#000000');
  const [favoriteColors, setFavoriteColors] = useState([]);

  const handleChange = (event) => {
    setColor(event.target.value);
    parentCallback(event.target.value);
  };

  // TODO: Set Maximum favorite color (8)+ delete
  const addFavoriteColor = () => {
    let exist = false;
    favoriteColors.forEach((currentColor) => {
      if (currentColor === color) exist = true;
    });
    if (!exist) { setFavoriteColors(() => [...favoriteColors, color]); }
  };

  const renderFavoriteColor = (favColor, index) => (
    <FavoriteColor
      color={favColor}
      onClick={handleChange}
      key={`fav-color-${index}`}
    />
  );

  return (
    <div className="d-flex justify-content-around align-items-start">
      <div className="me-3">
        {favoriteColors.map((favColor, index) => renderFavoriteColor(favColor, index))}
      </div>
      <div className="d-flex align-items-center m-2">
        <input
          type="color"
          id="inputPicker"
          className="inputPicker"
          value={color}
          onChange={handleChange}
        />
        <button type="button" onClick={addFavoriteColor} className="ms-2">
          <img
            src={heart}
            width="24px"
            height="24px"
            alt="add a favorite color"
          />
        </button>
      </div>
    </div>
  );
}

ColorPicker.propTypes = {
  parentCallback: PropTypes.func.isRequired,
};
