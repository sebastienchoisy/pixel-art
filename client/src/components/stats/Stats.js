import React from 'react';
import PropTypes from 'prop-types';

export default function Stats({ boardsNb, usersNb }) {
  return (
    <div>
      <div>
        <span>Nombre d&apos;utilisateurs: </span>
        {usersNb}
      </div>
      <div>
        <span>Nombre de boards: </span>
        {boardsNb}
      </div>
    </div>
  );
}

Stats.propTypes = {
  boardsNb: PropTypes.number.isRequired,
  usersNb: PropTypes.number.isRequired,
};
