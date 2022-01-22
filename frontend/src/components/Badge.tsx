import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import BadgeProgress from './BadgeProgress';

export default function Badge() {
  return (
    <>
    <Container className="mt-4">
      <Row>
        <Col>
          <h2>Książeczka GOT PTTK</h2>
        </Col>
        <Col>
          <div>
            <Button className="float-end">Click</Button>
          </div>
        </Col>
      </Row>
      <Row className="bg-light py-3 px-2 mt-4">
        <Col className="col-md-auto">
          <img className="rounded" src="https://via.placeholder.com/150" alt="tourist-img"></img>
        </Col>
        <Col>
          <h3>Tourist name</h3>
          <h4>Tourist badge</h4>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="py-2 bg-light">
          <h2>Wycieczki</h2>
        </Col>
        <Col className="col-lg-5">
          <BadgeProgress />
        </Col>
        
      </Row>
    </Container>
  </>
  )
}
