import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Field, FieldError, Form } from 'react-jsonschema-form-validation';
import {
  Button, FormGroup, Input, Label,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { defaultMessage, formatEmailCustomMessage } from './form-validation/login-custom-messages';
import loginSchema from './form-validation/login-form-schema';
import 'react-jsonschema-form-validation/dist/react-jsonschema-form-validation.css';

export default function LoginForm(props) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    defaultMessage,
    formatEmailCustomMessage,
  });

  const [hasCredentialsError, setHasCredentialsError] = useState(false);
  const { submitCallBack } = props;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasCredentialsError(submitCallBack(formData));
  };
  const handleChange = (newData) => { setFormData(newData); };

  return (
    <Form
      data={formData}
      onSubmit={handleSubmit}
      onChange={handleChange}
      className="form m-auto mt-5 login-form"
      schema={loginSchema}
      errorMessages={{
        required: () => formData.defaultMessage,
      }}
    >
      <div className="text-start">
        <FormGroup>
          <Label for="exampleEmail">
            Email
          </Label>
          <Field
            component={Input}
            id="exampleEmail"
            name="email"
            placeholder="Email"
            value={formData.email}
            onKeyDown={() => setHasCredentialsError(false)}
          />
          <FieldError
            errorMessages={{
              format: () => formData.formatEmailCustomMessage,
            }}
            name="email"
          />
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
