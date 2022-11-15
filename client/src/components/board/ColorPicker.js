import React from 'react';
import PropTypes from 'prop-types';

export default function ColorPicker({ parentCallback }) {
  return (
    <div>
      <input
        type="color"
        id="head"
        name="head"
        onChange={parentCallback}
      />
      <span>My Color</span>
    </div>
  );
}

ColorPicker.propTypes = {
  parentCallback: PropTypes.func.isRequired,
};
