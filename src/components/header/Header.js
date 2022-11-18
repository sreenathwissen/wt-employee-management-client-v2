import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import React from "react";
import "./header.css";
import { LinkContainer } from "react-router-bootstrap";
const Header = () => {
  return (
    <>
      <Navbar className="navbar" variant="dark" fixed="top">
        <Container>
          <Link to="/">
            <Navbar.Brand>
              <img
                src="img/Wissen-Logo-Final.jpg"
                alt="Bootstrap"
                width="120"
                height="20"
              />
            </Navbar.Brand>
          </Link>
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link>Employee</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/client">
              <Nav.Link>Client</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/project">
              <Nav.Link>Project</Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
