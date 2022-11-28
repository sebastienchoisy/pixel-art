import React from 'react';
import PropTypes from 'prop-types';
import './Favorite-color.css';

export default function FavoriteColor(props) {
  const { color, onClick } = props;
  return (
    <div>
      <button
        type="button"
        className="FavoriteColor my-1"
        value={color}
        onClick={onClick}
        style={{ backgroundColor: color }}
        alt="select a favorite color"
      />
    </div>
  );
}

FavoriteColor.propTypes = {
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
