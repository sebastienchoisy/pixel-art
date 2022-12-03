import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import userProptypes from '../../proptypes/user-proptypes';

export default function ProfileDisplay({ userData }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  return user && (
    <div>
      <div className="row d-flex justify-content-between">
        <div className="col-sm-5 mb-4 mb-sm-0 text-start">
          <div className="fw-bold">Pseudo</div>
          <div>{user.username}</div>
        </div>
        <div className="col-sm-5 mb-4 mb-sm-0 text-start">
          <div className="fw-bold">Email</div>
          <div>{user.email}</div>
        </div>
      </div>
      <div className="row d-flex justify-content-between mt-0 mt-sm-5">
        <div className="col-sm-5 mb-4 mb-sm-0 text-start">
          <div className="fw-bold">Date d&apos;inscription</div>
          <div><Moment format="DD/M/YY">{user.createdAt}</Moment></div>
        </div>
        <div className="col-sm-5 mb-4 mb-sm-0 text-start">
          <div className="fw-bold">Participations boards</div>
          <div>{user.pixelboardContributed.length}</div>
        </div>
      </div>
      <div className="row d-flex justify-content-between mt-0 mt-sm-5">
        <div className="col-sm-5 text-start">
          <div className="fw-bold">Participations pixels</div>
          <div>{user.nbPixelModified}</div>
        </div>
      </div>
      {/* TODO carrousel de composants displayBoard (board non modifiable) */}
    </div>
  );
}

ProfileDisplay.propTypes = {
  userData: userProptypes.isRequired,
};
