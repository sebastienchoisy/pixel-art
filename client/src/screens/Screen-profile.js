import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import userProptypes from '../proptypes/user-proptypes';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserForm from '../components/forms/user-form/User-form';
import ProfileDisplay from '../components/profile/Profile-display';
import { modifyUser } from '../services/APIService';
import { ThemeContext } from '../context/theme';

// Vue correspondante à l'affichaque du profil de l'utilisateur
export default function ScreenProfile({ userData }) {
  const [user, setUser] = useState(null);
  const [shouldModifyInformation, setShouldModifyInformation] = useState(false);
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  // callBack passé au composant enfant en cas de modification du profil
  const callBack = async (formData) => {
    const userFormData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };
    const resp = await modifyUser(userFormData);
    if (resp.data.success) {
      navigate('/profil');
      setShouldModifyInformation(false);
    }
  };

  return user && (
  <div className={`py-5 ${theme}`}>
    <div className={`m-auto ${!shouldModifyInformation ? 'col-6' : ''}`}>
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
  </div>
  );
}

ScreenProfile.propTypes = {
  userData: userProptypes.isRequired,
};
