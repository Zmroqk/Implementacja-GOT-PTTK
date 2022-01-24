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

  function onlyUnique(value: string, index: number, arr: Array<string>) {
    return arr.indexOf(value) === index;
  }

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

  const tripPlans = tripData.slice(0).reverse().map((t) => (
    <Row className="mb-2">
      <Container className="bg-light py-2 px-2 rounded">
        <Row>
          <Col className="col-md-auto">
            <img src="https://via.placeholder.com/175" alt="trip-map-img"></img>
          </Col>
          <Col>
            <h5 className="text-center">Z: {t.tripSegments[0].segment?.startPoint.name}, Do: {t.tripSegments[t.tripSegments.length - 1].segment?.endPoint.name}</h5>
            <h5 className="text-secondary mb-0">Przez:</h5>
            <ul>
            {
              t.tripSegments.map(ts => ts.direction).filter((x, i, a) => a.indexOf(x) == i).map(viaPoint => (
                <li><h5 className="text-secondary mb-0">{viaPoint}</h5></li>
              ))
            }
            </ul>
            <h5 className="mt-2 font-italic text-secondary">Opis: {t.description}</h5>
            <Row>
              <Col>
                <h5>Punkty GOT: {t.points}</h5>
              </Col>
              <Col>
                <Link to={`/tourist/trip/${t.id}`}>
                  <Button className="float-end">
                    Importuj trasę
                  </Button>
                </Link>
              </Col>
            </Row>
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
                    <h5 className="text-center">Utwórz plan wycieczki</h5>
                  </Col>
                </Row>
              </Container>
              </Link>
            </Col>
            <Col className="bg-light py-4 col-md-auto">
              <Row>
                <Col>
                <h4>Aktualnie zdobywana odznaka:</h4>
                { badgeData.badge.type ? (
                  <>
                    <h4 className="text-center">GOT {badgeData.badge.type.type} {badgeData.badge.level.level}</h4>
                    <h4 className="text-center">Punkty GOT: {badgeData.points}</h4>
                  </>
                ) : null }
                </Col>
              </Row>
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
