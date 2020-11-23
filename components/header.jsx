import React from 'react';
import Link from 'next/link';
import {connect} from 'react-redux';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import { useUser } from '../lib/user';

const Header = () => {
  const { user, loading } = useUser();

  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Site Famille</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Accueil</Nav.Link>
            {!loading &&
              (user ? (
                <>
                  <Nav.Link href="/mylist">Ma liste</Nav.Link>
                  <Nav.Link href="/beneficiaries">Beneficiaires</Nav.Link>
                </>
              ) : (
                <></>
              ))
            }
          </Nav>
          <Nav>
          {!loading &&
            (user ? (
              <NavDropdown title={user.given_name || "Utilisateur"} id="collasible-nav-dropdown">
                <NavDropdown.Item href="/profile">Mon profile</NavDropdown.Item>
                <NavDropdown.Item href="/api/logout">Me deconnecter</NavDropdown.Item>
              </NavDropdown>

          ) : (
            <Nav.Link href="/api/login">Se connecter</Nav.Link>
          ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />

    </header>
  );
};

export default connect()(Header);
