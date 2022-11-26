import React, { useState } from 'react';
import {
  Button, Form, FormGroup, Input, Label,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/APIService';

export default function ScreenLogin() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [hasCredentialsError, setHasCredentialsError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (login(email, pwd).success) {
      navigate('/');
    } else {
      setHasCredentialsError(true);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="form m-auto mt-5 login-form">
      <div className="text-start">
        <FormGroup>
          <Label for="exampleEmail">
            Email
          </Label>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={() => setHasCredentialsError(false)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">
            Password
          </Label>
          <Input
            id="examplePassword"
            name="password"
            placeholder="Password"
            type="password"
            onChange={(e) => setPwd(e.target.value)}
            onKeyDown={() => setHasCredentialsError(false)}
          />
        </FormGroup>
        {hasCredentialsError
            && (
              <div className="alert alert-danger alert-dismissible show" role="alert">
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setHasCredentialsError(false)} />
                Erreur: Mauvais identifiants
              </div>
            )}

      </div>
      <Button disabled={!(email && pwd)}>
        Submit
      </Button>
    </Form>
  );
}
