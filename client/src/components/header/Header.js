import React, { useEffect, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  NavLink as RRNavLink, Link,
} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Button,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import mushroom from '../../assets/mushroom.png';
import { ThemeContext } from '../../context/ThemeContext';

export default function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  let { username } = props;
  const { changeTheme } = props;
  const theme = useContext(ThemeContext);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    // TODO improve
    // eslint-disable-next-line react/destructuring-assignment
    username = props.username;
    // eslint-disable-next-line react/destructuring-assignment
  }, [props.username]);

  return (
    <header style={theme}>
      <Navbar className="navbar-expand-md navbar-light bg-light">
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
                  <NavLink tag={RRNavLink} to="/signin">S&apos;inscrire</NavLink>
                </NavItem>
                )}
          </Nav>
          {username
            && (
            <NavbarText className="me-2">{username}</NavbarText>)}
          {username
            && (
            <Button className="me-2" outline color="secondary">Deconnexion</Button>)}
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
