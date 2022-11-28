import React, { useEffect, useState } from 'react';
import { Field, FieldError, Form } from 'react-jsonschema-form-validation';
import {
  Button, FormFeedback, FormGroup, Input, Label,
} from 'reactstrap';
import PropTypes from 'prop-types';
import {
  defaultMessage,
  formatEmailCustomMessage,
  maxPasswordCustomMessage,
  maxUsernameCustomMessage,
  minPasswordCustomMessage,
  minUsernameCustomMessage,
  patternUsernameCustomMessage,
} from './form-validation/user-custom-messages';
import { checkUsernameAvailability } from '../../../services/APIService';
import schema from './form-validation/user-form-schema';
import userProptypes from '../../../proptypes/user-proptypes';

export default function UserForm({ submitCallBack, userData }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    defaultMessage,
    formatEmailCustomMessage,
    minUsernameCustomMessage,
    maxUsernameCustomMessage,
    patternUsernameCustomMessage,
    minPasswordCustomMessage,
    maxPasswordCustomMessage,
  });
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(undefined);
  const [arePwdDifferents, setArePwdDifferents] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      setArePwdDifferents(true);
    } else {
      submitCallBack(formData);
    }
  };
  useEffect(() => {
    if (userData) {
      setFormData({
        ...formData,
        username: userData.username,
        email: userData.email,
      });
    }
  }, [userData]);
  const handleChange = (newData) => setFormData(newData);

  const checkUsername = async () => {
    setIsUsernameAvailable(checkUsernameAvailability(formData.username).success);
  };

  function isUsernameValid(username) {
    return username.match(/^[a-zA-Z0-9]+$/)
        && username.length >= 4 && username.length <= 20;
  }

  return (
    <Form
      data={formData}
      onSubmit={handleSubmit}
      onChange={handleChange}
      schema={userData ? { ...schema, required: ['username', 'email'] } : schema}
      errorMessages={{
        required: () => formData.defaultMessage,
      }}
      className="form m-auto mt-5 login-form"
    >
      <div className="text-start">
        <FormGroup>
          <Label for="username">
            Pseudo
          </Label>
          <Field
            component={Input}
            id="username"
            name="username"
            placeholder="Pseudo"
            type="string"
            valid={
              isUsernameAvailable && !!formData.username && !!isUsernameValid(formData.username)
            }
            value={formData.username}
            onBlur={() => checkUsername(formData.username)}
          />
          <FieldError
            errorMessages={{
              minLength: () => formData.minUsernameCustomMessage,
              maxLength: () => formData.maxUsernameCustomMessage,
              pattern: () => formData.patternUsernameCustomMessage,
            }}
            name="username"
          />
          <FormFeedback valid>
            Ce pseudo est disponible
          </FormFeedback>
          <FormFeedback invalid="true">
            Ce pseudo est déjà pris !
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="email">
            Email
          </Label>
          <Field
            component={Input}
            id="email"
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
          />
          <FieldError
            errorMessages={{
              format: () => formData.formatEmailCustomMessage,
            }}
            name="email"
          />
        </FormGroup>
        <FormGroup>
          <Label for="pwd">
            Mot de passe
          </Label>
          <Field
            component={Input}
            id="password"
            name="password"
            placeholder="Mot de passe"
            type="password"
            value={formData.password}
          />
          <FieldError
            name="password"
            errorMessages={{
              minLength: () => formData.minPasswordCustomMessage,
              maxLength: () => formData.maxPasswordCustomMessage,
            }}
          />
        </FormGroup>

        <FormGroup>
          <Label for="password2">
            Confirmer votre mot de passe
          </Label>
          <Field
            component={Input}
            id="password2"
            name="password2"
            placeholder="Mot de passe"
            type="password"
            value={formData.password2}
          />
          <FieldError
            name="password2"
            errorMessages={{
              minLength: () => formData.minPasswordCustomMessage,
              maxLength: () => formData.maxPasswordCustomMessage,
            }}
          />
        </FormGroup>

        {arePwdDifferents
                && (
                <div className="alert alert-danger alert-dismissible show" role="alert">
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setArePwdDifferents(false)} />
                  Erreur: Les mots de passes ne sont pas identiques
                </div>
                )}
      </div>
      <Button>
        Submit
      </Button>
    </Form>
  );
}

UserForm.propTypes = {
  submitCallBack: PropTypes.func.isRequired,
  userData: userProptypes,
};

UserForm.defaultProps = {
  userData: null,
};
