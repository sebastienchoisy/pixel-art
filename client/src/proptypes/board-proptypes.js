import PropTypes from 'prop-types';
import pixelProptypes from './pixel-proptypes';

const boardProptypes = PropTypes.shape({
  pixelBoardname: PropTypes.string.isRequired,
  closure: PropTypes.bool,
  nbLines: PropTypes.number.isRequired,
  nbColumns: PropTypes.number.isRequired,
  dateOfClosure: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  intervalPixel: PropTypes.number,
  multipleDrawPixel: PropTypes.bool,
  pixels: PropTypes.arrayOf(pixelProptypes),
});

export default boardProptypes;
