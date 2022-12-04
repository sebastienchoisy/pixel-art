import PropTypes from 'prop-types';

// Proptypes pour l'utilisateur
const userProptypes = PropTypes.shape({
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  boards: PropTypes.arrayOf(PropTypes.number),
  nbPixelModified: PropTypes.number.isRequired,
});

export default userProptypes;
