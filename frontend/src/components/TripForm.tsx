import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import { Badge as BadgeEntity } from '../apiEntities/Badge.entity'

interface IBadgeState {
	badge: BadgeEntity;
  points: number;
}

export default function TripForm() {
   

  return (
    <Container className="my-4">
      <Row>
         <Col>
            <h3>Tworzenie wycieczki</h3>
         </Col>
         <Col>
            
         </Col>
      </Row>
    </Container>
  );
}
