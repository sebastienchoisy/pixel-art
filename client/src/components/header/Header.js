import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  NavLink as RRNavLink, Link, useNavigate,
} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText, Button, FormGroup, Input, Form,
} from 'reactstrap';
import PropTypes from 'prop-types';
import mushroom from '../../assets/mushroom.png';
import { logout } from '../../services/APIService';
import { ThemeContext } from '../../context/theme';

// Composant correspondant au header de l'application
export default function Header({ username, changeTheme }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const isDark = () => theme === 'dark';

  // Méthode de déconnexion
  const disconnect = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header>
      <Navbar color={theme} dark={isDark()} className="navbar-expand-md navbar-light bg-light">
        <NavbarBrand tag={Link} to="/">
          <img className="logo" src={mushroom} alt="mushroom" />
          PixelArt
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto m-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/">Accueil</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/boards">Boards</NavLink>
            </NavItem>
            {username
                && (
                <NavItem>
                  <NavLink tag={RRNavLink} to="/profil">Profil</NavLink>
                </NavItem>
                )}
            {!username
                && (
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Connexion</NavLink>
                </NavItem>
                )}
            {!username
                && (
                <NavItem>
                  <NavLink tag={RRNavLink} to="/signup">S&apos;inscrire</NavLink>
                </NavItem>
                )}
          </Nav>
          {username
            && (
            <NavbarText className="me-4">{username}</NavbarText>)}
          {username
            && (
            <Button onClick={disconnect} className="me-4" outline={theme === 'light'} color="secondary">Deconnexion</Button>)}
          <Form>
            <FormGroup switch>
              <Input type="switch" role="switch" onClick={changeTheme} />
            </FormGroup>
          </Form>
        </Collapse>
      </Navbar>
    </header>
  );
}

Header.propTypes = {
  username: PropTypes.string,
  changeTheme: PropTypes.func.isRequired,
};

Header.defaultProps = {
  username: null,
};
