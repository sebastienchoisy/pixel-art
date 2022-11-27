import React, { useEffect, useState } from 'react';
import userPropTypes from '../../propTypes/userPropTypes';

export default function ProfileDisplay({ userData }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  return user && (
    <div>
      <div className="row d-flex justify-content-between">
        <div className="col-5 text-start">
          <div className="fw-bold">Pseudo</div>
          <div>{user.username}</div>
        </div>
        <div className="col-5 text-start">
          <div className="fw-bold">Email</div>
          <div>{user.email}</div>
        </div>
      </div>
      <div className="row d-flex justify-content-between mt-5">
        <div className="col-5 text-start">
          <div className="fw-bold">Date d&apos;inscription</div>
          <div>{user.inscriptionDate}</div>
        </div>
        <div className="col-5 text-start">
          <div className="fw-bold">Participations boards</div>
          <div>{user.boards.length}</div>
        </div>
      </div>
      <div className="row d-flex justify-content-between mt-5">
        <div className="col-5 text-start">
          <div className="fw-bold">Participations pixels</div>
          <div>{user.pixelsNb}</div>
        </div>
      </div>
      {/* TODO carrousel de composants displayBoard (board non modifiable) */}
    </div>
  );
}

ProfileDisplay.propTypes = {
  userData: userPropTypes.isRequired,
};
