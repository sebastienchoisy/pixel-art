import PropTypes from 'prop-types';

// Proptypes pour le pixel
const pixelProptypes = PropTypes.shape({
  posX: PropTypes.number.isRequired,
  posY: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  occurence: PropTypes.number.isRequired,
  lastUpdateUser: PropTypes.string,
});

export default pixelProptypes;
