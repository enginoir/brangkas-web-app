import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ShoppingCart } from 'phosphor-react';

export const NavigationBar = () => {
  const marginBottom = {
    marginBottom: '50px',
  };
  return (
    <Navbar bg="dark" data-bs-theme="dark" style={marginBottom}>
      <Container>
        <Navbar.Brand href="/">Brankas</Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/menu">Menu</Nav.Link>
          <Nav.Link href="/category">Category</Nav.Link>
          <Nav.Link href="/cart">
            <ShoppingCart size={32} />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
