import React, { useState } from 'react';
import { Field, FieldError, Form } from 'react-jsonschema-form-validation';
import {
  Button, FormGroup, Input, Label,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { defaultMessage } from './form-validation/login-custom-messages';
import loginSchema from './form-validation/login-form-schema';
import 'react-jsonschema-form-validation/dist/react-jsonschema-form-validation.css';

export default function LoginForm({ submitCallBack }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    defaultMessage,
  });

  const [hasCredentialsError, setHasCredentialsError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasCredentialsError(await submitCallBack(formData));
  };
  const handleChange = (newData) => { setFormData(newData); };

  return (
    <Form
      data={formData}
      onSubmit={handleSubmit}
      onChange={handleChange}
      schema={loginSchema}
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
            value={formData.username}
            onKeyDown={() => setHasCredentialsError(false)}
          />
          <FieldError name="username" />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">
            Password
          </Label>
          <Field
            component={Input}
            id="examplePassword"
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onKeyDown={() => setHasCredentialsError(false)}
          />
          <FieldError name="password" />
        </FormGroup>
        {hasCredentialsError
                && (
                <div className="alert alert-danger alert-dismissible show" role="alert">
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setHasCredentialsError(false)} />
                  Erreur: Mauvais identifiants
                </div>
                )}
      </div>
      <Button>
        Submit
      </Button>
    </Form>
  );
}

LoginForm.propTypes = {
  submitCallBack: PropTypes.func.isRequired,
};
