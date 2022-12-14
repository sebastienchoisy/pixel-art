import React, { useState } from 'react';
import PropTypes from 'prop-types';
import heart from '../../../assets/heart.png';
import FavoriteColor from './Favorite-color/Favorite-color';
import './Color-picker.css';

// Composant pour choisir une couleur
export default function ColorPicker({ parentCallback }) {
  const [color, setColor] = useState('#000000');
  const [favoriteColors, setFavoriteColors] = useState([]);

  // Changer l'état de la couleur
  const handleChange = (event) => {
    setColor(event.target.value);
    parentCallback(event.target.value);
  };

  // Ajouter une couleur favorite
  // TODO: Set Maximum favorite color (8)+ delete
  const addFavoriteColor = () => {
    let exist = false;
    favoriteColors.forEach((currentColor) => {
      if (currentColor === color) exist = true;
    });
    if (!exist) { setFavoriteColors(() => [...favoriteColors, color]); }
  };

  // Afficher la couleur favorite
  const renderFavoriteColor = (favColor, index) => (
    <FavoriteColor
      color={favColor}
      onClick={handleChange}
      key={`fav-color-${index}`}
    />
  );

  return (
    <div>
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
      <div className="me-3 d-flex justify-content-start">
        {favoriteColors.map((favColor, index) => renderFavoriteColor(favColor, index))}
      </div>
    </div>
  );
}

ColorPicker.propTypes = {
  parentCallback: PropTypes.func.isRequired,
};
