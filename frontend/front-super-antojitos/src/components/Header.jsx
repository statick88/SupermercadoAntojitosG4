// src/components/Header.js
import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';  // Importa Link y NavLink

const Header = () => {
  return (
    <header id="header" className="header d-flex align-items-center sticky-top">
      <Navbar bg="light" expand="lg" className="w-100">
        <Container>
          <Navbar.Brand as={Link} to="/" className="me-auto d-flex align-items-center">
            {/* Uncomment if you want to use an image logo */}
            {/* <img src="assets\img\logo.png" alt="" className="d-inline-block align-top" /> */}
            <h2 className="sitename mb-0">Antojitos</h2>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
              <Nav.Link as={NavLink} to="/clientes">Clientes</Nav.Link>
              <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
              <Nav.Link as={NavLink} to="/ventas">Ventas</Nav.Link>
              <Nav.Link as={NavLink} to="/detalles">Detalles Ventas</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
