import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, Container, Nav, Navbar, NavDropdown, ToggleButton} from 'react-bootstrap';

import Leader from './Leader';
import Closure from './Closure';
import Segment from './Segment';


import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate
  } from "react-router-dom";
import { SegmentForm } from './SegmentForm';


export default function Admin() {
    const [radioValue, setRadioValue] = useState('1');

    const navigate = useNavigate();

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
                          <ButtonGroup>
                                <ToggleButton
                                    key={1}
                                    id={`radio-1`}
                                    type="radio"
                                    variant={"outline-primary"}
                                    name="radio"
                                    value={1}
                                    checked={radioValue === "1"}
                                    onChange={(e) => {
                                        setRadioValue(e.currentTarget.value);
                                        navigate("/admin")
                                    }}
                                >
                                    Admin
                                </ToggleButton>
                                <ToggleButton
                                    key={2}
                                    id={`radio-2`}
                                    type="radio"
                                    variant={"outline-primary"}
                                    name="radio"
                                    value={2}
                                    checked={radioValue === "2"}
                                    onChange={(e) => {
                                        setRadioValue(e.currentTarget.value);
                                        navigate("/tourist")
                                    }}
                                >
                                    Turysta
                                </ToggleButton>
                            </ButtonGroup>
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
                  <Route path="/segment/:id" element={<SegmentForm />} />
              </Routes>
          </div>
          </div>
    )
}
