import React, { useEffect, useState, useContext } from 'react'
import './Header.css'
import { Navbar, Container, Nav, Modal, Button, Dropdown, Row } from 'react-bootstrap'
import UserUtil from '../../util/UserUtil'
import { AuthContext } from '../../pages/auth/AuthContext'

export default function Header() {

  const { isSignedIn, setJwtToken } = useContext(AuthContext);

  return (
    <Navbar dark lg collapseOnSelect style={{ backgroundColor: "aliceblue" }}>
      <Container>
        <Navbar.Brand href="/" style={{ display: "flex", alignContent: "center", alignItems: "center", marginLeft: "15px" }}>
          <img src="https://herpi.ge/lizard.png" width="35px" height="35px" className="d-inline-block align-top" />
          <b style={{ marginLeft: "10px", fontSize: "xx-large" }}>Reptiles</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/">მთავარი</Nav.Link>
            <Nav.Link href="/reptiles/create">დამატება</Nav.Link>
            {

              isSignedIn ?
                <Nav.Link href="#logout" onClick={() => { UserUtil.logOut(); setJwtToken(null); }}>გასვლა</Nav.Link>
                :
                <Nav.Link href="/login">შესვლა</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
