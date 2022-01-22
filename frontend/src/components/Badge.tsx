import React, { Fragment, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import BadgeProgress from './BadgeProgress';
import { Badge as BadgeEntity } from '../apiEntities/Badge.entity'

interface IBadgeState {
	badge: BadgeEntity;
  points: number;
}

export default function Badge() {
  const [data, setData] = useState<IBadgeState>({
    badge: {} as BadgeEntity,
    points: 0,
	});

  useEffect(() => {
		fetch("http://localhost:3001/tourist/badge/ongoing/2")
			.then((data) => data.json())
			.then((jsonData) => setData(jsonData));
	}, []);

  const touristName = data.badge.tourist ? (
    <h3>{data.badge.tourist.user.name} {data.badge.tourist.user.surname}</h3>
  ) : null;

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
          {touristName}
          {/* TODO tu moze byc aktualna odznaka */}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="py-2 bg-light">
          <h2>Wycieczki</h2>
        </Col>
        <Col className="col-lg-5">
          {
            data.badge.type ? (
              <BadgeProgress 
              badgeName={data.badge.type.type}
              badgeLevel={data.badge.level.level}
              points={data.points}
              pointsMax={240}
              />
            ) : null
          }
        </Col>
        
      </Row>
    </Container>
  </>
  )
}
