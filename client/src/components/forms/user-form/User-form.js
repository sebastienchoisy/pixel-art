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

// Composant correspondant au form de création/modification d'utilisateur'
export default function UserForm({ submitCallBack, userData }) {
  // On initialise le formData
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
  const [isUsernameTouched, setIsUsernameTouched] = useState(false);
  const [arePwdDifferents, setArePwdDifferents] = useState(false);

  // Méthode pour envoyer le formData au server à travers le callback du parent
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      setArePwdDifferents(true);
    } else {
      submitCallBack(formData);
    }
  };

  // Méthode pour ajouter le pseudo et le mail dans un cas de modification de profil
  useEffect(() => {
    if (userData) {
      setFormData({
        ...formData,
        username: userData.username,
        email: userData.email,
      });
    }
  }, [userData]);

  // Mise à jour du formData lorsqu'on change une valeur dans le form
  const handleChange = (newData) => setFormData(newData);

  // Méthode pour vérifier que le nom d'utilisateur est disponible (unique)
  const checkUsername = async () => {
    const resp = await checkUsernameAvailability(formData.username);
    setIsUsernameAvailable(
      resp.data.success || (userData && formData.username === userData.username),
    );
    if (!isUsernameTouched) {
      setIsUsernameTouched(true);
    }
  };

  // Méthode pour vérifier que le nom de la board est bien valide
  // pour la props valid/invalid de reactStrap Input
  const isUsernameValid = (username) => username.match(/^[a-zA-Z0-9]+$/)
      && username.length >= 4 && username.length <= 20;

  return (
    <Form
      data={formData}
      onSubmit={handleSubmit}
      onChange={handleChange}
      schema={userData ? { ...schema, required: ['username', 'email'] } : schema}
      errorMessages={{
        required: () => formData.defaultMessage,
      }}
      className="form m-auto pt-5 size-form"
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
            invalid={isUsernameTouched && !isUsernameAvailable}
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
