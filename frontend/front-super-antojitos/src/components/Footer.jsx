// src/components/Footer.js
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="bottom">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="#clientes">Clientes</Nav.Link>
          <Nav.Link href="#detalles-ventas">Detalles Ventas</Nav.Link>
          <Nav.Link href="#ventas">Ventas</Nav.Link>
          <Nav.Link href="#productos">Productos</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Footer;
