import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, ToggleButton, Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';

import Plan from './Plan';
import Trip from './Trip';
import Badge from './Badge';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate
  } from "react-router-dom";


export default function Tourist() {
    const [radioValue, setRadioValue] = useState('2');

    const navigate = useNavigate();

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
                <Route path="/plan" element={<Plan />} />
                <Route path="/trip" element={<Trip />} />
                <Route path="/badge" element={<Badge />} />
            </Routes>
        </div>
        </div>
  )
}
function useHistory() {
    throw new Error('Function not implemented.');
}

