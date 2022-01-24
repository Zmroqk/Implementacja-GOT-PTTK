import React, { Fragment, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap';
import BadgeProgress from './BadgeProgress';
import { Badge as BadgeEntity } from '../apiEntities/Badge.entity'
import { TripPlan } from "../apiEntities/TripPlan.entity";
import { Tourist } from "../apiEntities/Tourist.entity";
import { TripSegment } from "../apiEntities/TripSegment.entity";

interface IBadgeState {
	badge: BadgeEntity;
  points: number;
  inPolandRatio: number;
  mountainRangesCount: number;
}

interface ITripData {
  tripSegments: TripSegment;
}

export default function Badge() {
  const [data, setData] = useState<IBadgeState>({
    badge: {} as BadgeEntity,
    points: 0,
    inPolandRatio: 0.0,
    mountainRangesCount: 0,
	});

  const [tripData, setTripData] = useState<TripPlan[]>([]);

  // TODO - hardcoded user id
  useEffect(() => {
		fetch("http://localhost:3001/tourist/badge/ongoing/2")
			.then((data) => data.json())
			.then((jsonData) => setData(jsonData));
	}, []);

  {/* TODO - to ma fetchowac plany wycieczek a fetchuje wszystkie plany */}
  useEffect(() => {
		fetch("http://localhost:3001/Tourist/trip/trips/")
			.then((tripData) => tripData.json())
			.then((jsonData) => setTripData(jsonData));
	}, []);

  const touristName = data.badge.tourist ? (
    <h3>{data.badge.tourist.user.name} {data.badge.tourist.user.surname}</h3>
  ) : null;

  console.log(tripData);

  const tripPlans = tripData.map((t) => (
    <Row className="mb-2">
        <Container className="bg-success py-2 px-2 rounded">
          <Row>
            <Col className="col-md-auto">
              <img src="https://via.placeholder.com/150" alt="trip-map-img"></img>
            </Col>
            <Col>
              <h5 className="text-center">{t.tripSegments[0].segment?.startPoint.name} - {t.tripSegments[t.tripSegments.length - 1].segment?.endPoint.name}
              </h5>
            </Col>
          </Row>
        </Container>
    </Row>
  ));

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
          <h2>Wycieczki - okres odznaki 2022</h2>

          {tripPlans}
        </Col>
        <Col className="col-lg-5">
          {
            data.badge.type ? (
              <BadgeProgress 
              badgeName={data.badge.type.type}
              badgeLevel={data.badge.level.level}
              points={data.points}
              pointsMax={240}
              inPolandRatio={data.inPolandRatio}
              mountainRangesCount={data.mountainRangesCount}
              maxRangesCount={2}
              />
            ) : null
          }
        </Col>
        
      </Row>
    </Container>
  </>
  )
}
