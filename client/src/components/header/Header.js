import React, { useState } from 'react';
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
} from 'reactstrap';
import mushroom from '../../assets/mushroom.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

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
            <NavItem>
              <NavLink tag={RRNavLink} to="/profil">Profil</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/login">Connexion</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>Draw with us</NavbarText>
        </Collapse>
      </Navbar>
    </header>
  );
}
