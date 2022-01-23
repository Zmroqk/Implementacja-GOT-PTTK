import React, { Fragment, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";
import BadgeProgress from './BadgeProgress';
import { Badge as BadgeEntity } from '../apiEntities/Badge.entity'
import { TripPlan } from "../apiEntities/TripPlan.entity";
import { Tourist } from "../apiEntities/Tourist.entity";
import { TripSegment } from "../apiEntities/TripSegment.entity";

interface IBadgeState {
	badge: BadgeEntity;
  points: number;
}


export default function Trip() {
  const [badgeData, setBadgeData] = useState<IBadgeState>({
    badge: {} as BadgeEntity,
    points: 0,
  });

  console.log(badgeData);

   useEffect(() => {
		fetch("http://localhost:3001/tourist/badge/ongoing/2")
			.then((badgeData) => badgeData.json())
			.then((jsonData) => setBadgeData(jsonData));
	}, []);

  const [tripData, setTripData] = useState<TripPlan[]>([]);

  useEffect(() => {
		fetch("http://localhost:3001/Tourist/tripplan")
			.then((tripData) => tripData.json())
			.then((jsonData) => setTripData(jsonData));
	}, []);

  const tripPlans = tripData.map((t) => (
    <Row className="mb-2">
      <Container className="bg-light py-2 px-2 rounded">
        <Row>
          <Col className="col-md-auto">
            <img src="https://via.placeholder.com/150" alt="trip-map-img"></img>
          </Col>
          <Col>
            <h5 className="text-center">{t.tripSegments[0].segment?.startPoint.name} - {t.tripSegments[t.tripSegments.length - 1].segment?.endPoint.name}
            </h5>
            <h5>Punkty GOT: {t.points}</h5>
            <Link to={`/tourist/trip/${t.id}`}>
              <Button className="float-end">
                Importuj trasę
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>  
    </Row>
  ));

  return (
  <Container>
    <Row>
      <Col>
        <Row className="mt-3">
          <h3>Nowa trasa wycieczki</h3>
          <Row className="mb-2">
            <Col>
              <Link to="/tourist/plan">
              <Container className="bg-light py-2 px-2 rounded">
                <Row>
                  <Col className="col-md-auto">
                    <img src="https://via.placeholder.com/150" alt="trip-map-img"></img>
                  </Col>
                  <Col>
                    <h5 className="text-center">Utwórz plan wycieczki
                    </h5>
                  </Col>
                </Row>
              </Container>
              </Link>
            </Col>
            <Col className="col-md-auto">
              <h4>Aktualnie zdobywana odznaka:</h4>
              { badgeData.badge.type ? (
                <>
                  <h4 className="text-center">GOT {badgeData.badge.type.type} {badgeData.badge.level.level}</h4>
                  <h4>Punkty GOT: {badgeData.points}</h4>
                </>
              ) : null }
              
            </Col>
          </Row>
        </Row>

        <Row className="mt-3">
          <h3>Plany wycieczek</h3>
          {tripPlans}
        </Row>
      </Col>
    </Row>
  </Container>
  )
}
