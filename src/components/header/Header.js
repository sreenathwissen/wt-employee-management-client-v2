import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import React from "react";
import "./header.css";
const Header = () => {
  return (
    <Navbar className="navbar" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="#home">
          <img
            src="img/Wissen-Logo-Final.jpg"
            alt="Bootstrap"
            width="120"
            height="20"
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
