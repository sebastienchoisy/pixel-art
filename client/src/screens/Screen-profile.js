import React, { useEffect, useState } from 'react';
import userProptypes from '../proptypes/user-proptypes';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserForm from '../components/forms/signup-form/User-form';
import ProfileDisplay from '../components/profile/Profile-display';
import { modifyUser } from '../services/APIService';

export default function ScreenProfile({ userData }) {
  const [user, setUser] = useState(null);
  const [shouldModifyInformation, setShouldModifyInformation] = useState(false);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  const callBack = (formData) => {
    setShouldModifyInformation(false);
    modifyUser(formData);
  };

  return user && (
  <div className="w-50 m-auto mt-5 mb-5 profil-container">
    {!shouldModifyInformation
        && (
        <div className="text-end mt-5 mb-5">
          <button className="btn btn-success btn-sm rounded-1" type="button" aria-label="Edit" onClick={() => setShouldModifyInformation(!shouldModifyInformation)}>
            Modifier profil
            <i className="bi bi-pencil-square ms-1" />
          </button>
        </div>
        )}
    {shouldModifyInformation
      ? (<UserForm submitCallBack={callBack} userData={userData} />)
      : (<ProfileDisplay userData={userData} />)}
  </div>
  );
}

ScreenProfile.propTypes = {
  userData: userProptypes.isRequired,
};
