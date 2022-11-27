import React, { useEffect, useState } from 'react';
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
  NavbarText, Button,
} from 'reactstrap';
import PropTypes from 'prop-types';
import mushroom from '../../assets/mushroom.png';

export default function Header(props) {
  const [isOpen, setIsOpen] = useState(false);
  let { username } = props;
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    // TODO improve
    // eslint-disable-next-line react/destructuring-assignment
    username = props.username;
    // eslint-disable-next-line react/destructuring-assignment
  }, [props.username]);

  return (
    <header>
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
                  <NavLink tag={RRNavLink} to="/signup">S&apos;inscrire</NavLink>
                </NavItem>
                )}
          </Nav>
          {username
            && (
            <NavbarText className="me-2">{username}</NavbarText>)}
          {username
            && (
            <Button outline color="secondary">Deconnexion</Button>)}
        </Collapse>
      </Navbar>
    </header>
  );
}

Header.propTypes = {
  username: PropTypes.string,
};

Header.defaultProps = {
  username: null,
};
