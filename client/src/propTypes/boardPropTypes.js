import PropTypes from 'prop-types';
import pixelPropTypes from './pixelPropTypes';

const boardPropTypes = PropTypes.shape({
  pixelBoardname: PropTypes.string.isRequired,
  closure: PropTypes.bool.isRequired,
  nbLines: PropTypes.number.isRequired,
  nbColumns: PropTypes.number.isRequired,
  dateOfClosure: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  intervalPixel: PropTypes.number,
  multipleDrawPixel: PropTypes.bool,
  pixels: PropTypes.arrayOf(pixelPropTypes),
});

export default boardPropTypes;
