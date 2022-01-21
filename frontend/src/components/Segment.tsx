import React from 'react';
import { Container, Row, Col, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

export default function Segment() {
  return (
    <>
    <Container className='mt-4'>
    <h2>Odcinki</h2>
      <Button>Nowy odcinek</Button>
      <ListGroup>
        <ListGroupItem>FOO</ListGroupItem>
      </ListGroup>
    </Container>
    </>
  )
}
