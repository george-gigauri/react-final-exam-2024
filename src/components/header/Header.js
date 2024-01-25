import React, { useEffect, useState } from 'react'
import './Header.css'
import { Navbar, Container, Nav, Modal, Button, Dropdown, Row } from 'react-bootstrap'
import UserUtil from '../../util/UserUtil'

export default function Header() {
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
              (() => {
                if (UserUtil.isSignedIn()) {
                  return (
                    <Nav.Link href="/" onClick={() => { UserUtil.logOut() }}>გასვლა</Nav.Link>
                  )
                } else {
                  return (
                    <Nav.Link href="/login">შესვლა</Nav.Link>
                  )
                }
              })()
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
