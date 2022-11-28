import PropTypes from 'prop-types';

const userProptypes = PropTypes.shape({
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  inscriptionDate: PropTypes.string.isRequired,
  boards: PropTypes.arrayOf(PropTypes.number),
  pixelsNb: PropTypes.number.isRequired,
});

export default userProptypes;
