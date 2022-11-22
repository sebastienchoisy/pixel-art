import React, { useState, useContext } from 'react';
import {
  Button, Form, FormGroup, Input, Label,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { signin } from '../services/APIService';
import { ThemeContext } from '../context/ThemeContext';

export default function ScreenSignin() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [checkPwd, setCheckPwd] = useState('');
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signin(email, pwd).success) {
      navigate('/');
    }
  };

  return (
    <div style={theme}>
      <Form onSubmit={handleSubmit} className="form m-auto mt-5 login-form">
        <div className="text-start">
          <FormGroup>
            <Label for="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="pwd">
              Password
            </Label>
            <Input
              id="pwd"
              name="pwd"
              placeholder="Mot de passe"
              type="password"
              onChange={(e) => setPwd(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="check-pwd">
              Confirmer votre mot de passe
            </Label>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Confirmer votre mot de passe"
              type="password"
              onChange={(e) => setCheckPwd(e.target.value)}
            />
          </FormGroup>
        </div>
        <Button disabled={!(email && pwd && checkPwd)}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
