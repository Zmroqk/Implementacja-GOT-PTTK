import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';

import Plan from './Plan';
import Trip from './Trip';
import Badge from './Badge';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";




export default function Tourist() {
  return (
      <div>
        <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#">GOT PTTK</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#">Aktualności</Nav.Link>
                            <Nav.Link as={Link} to="/tourist/plan">Planowanie</Nav.Link>
                            <Nav.Link as={Link} to="/tourist/trip">Wycieczki</Nav.Link>
                            <Nav.Link as={Link} to="/tourist/badge">Książeczka GOT</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets">Admin</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
        <div>
            <Routes>
                <Route path="/plan" element={<Plan />} />
                <Route path="/trip" element={<Trip />} />
                <Route path="/badge" element={<Badge />} />
            </Routes>
        </div>
        </div>
  )
}
