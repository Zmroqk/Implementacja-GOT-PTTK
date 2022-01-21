import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';

import Leader from './Leader';
import Closure from './Closure';
import Segment from './Segment';


import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";


export default function Admin() {
    return (
        <div>
          <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                  <Container>
                      <Navbar.Brand href="#">Admin GOT PTTK</Navbar.Brand>
                      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                      <Navbar.Collapse id="responsive-navbar-nav">
                          <Nav className="me-auto">
                              <Nav.Link as={Link} to="/admin/leader">Przodownicy</Nav.Link>
                              <Nav.Link as={Link} to="/admin/closure">Zamknięcia</Nav.Link>
                              <Nav.Link as={Link} to="/admin/segment">Odcinki</Nav.Link>
                              <Nav.Link href="#">Punkty</Nav.Link>
                          </Nav>
                          <Nav>
                              <Nav.Link href="#deets"></Nav.Link>
                          </Nav>
                      </Navbar.Collapse>
                  </Container>
              </Navbar>
          </div>
          <div>
              <Routes>
                  <Route path="/leader" element={<Leader />} />
                  <Route path="/closure" element={<Closure />} />
                  <Route path="/segment" element={<Segment />} />
              </Routes>
          </div>
          </div>
    )
}
