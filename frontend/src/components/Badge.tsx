import React, { Fragment, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, ProgressBar, Row, Alert } from 'react-bootstrap';
import BadgeProgress from './BadgeProgress';
import { Badge as BadgeEntity } from '../apiEntities/Badge.entity'
import { TripPlan } from "../apiEntities/TripPlan.entity";
import { Tourist } from "../apiEntities/Tourist.entity";
import { TripSegment } from "../apiEntities/TripSegment.entity";
import { Trip } from "../apiEntities/Trip.entity";

interface IBadgeState {
	badge: BadgeEntity;
  points: number;
  inPolandRatio: number;
  mountainRangesCount: number;
}

export default function Badge() {
  const [data, setData] = useState<IBadgeState>({
    badge: {} as BadgeEntity,
    points: 0,
    inPolandRatio: 0.0,
    mountainRangesCount: 0,
	});

  const [tripData, setTripData] = useState<Trip[]>([]);

  const [previousBadges, setPreviousBadges] = useState<BadgeEntity[]>([]);

  const userId = 2;

  useEffect(() => {
		fetch(`http://localhost:3001/tourist/badge/ongoing/${userId}`)
			.then((data) => data.json())
			.then((jsonData) => setData(jsonData));
	}, []);

  useEffect(() => {
		fetch(`http://localhost:3001/Tourist/trip/trip/${userId}`)
			.then((tripData) => tripData.json())
			.then((jsonData) => setTripData(jsonData));
	}, []);

  useEffect(() => {
		fetch(`http://localhost:3001/Tourist/badge/${userId}`)
			.then((badgeData) => badgeData.json())
			.then((jsonData) => setPreviousBadges(jsonData));
	}, []);

  const touristName = data.badge.tourist ? (
    <h3>{data.badge.tourist.user.name} {data.badge.tourist.user.surname}</h3>
  ) : null;

  const touristBadge = previousBadges && previousBadges[0] ? (
    <h4>Odznaka: GOT {previousBadges[0].type.type} {previousBadges[0].level.level}</h4>
  ) : null;

  const edgeWaypoints = (tp: TripPlan) => {
    const first = tp.tripSegments[0];
    const last = tp.tripSegments[tp.tripSegments.length - 1];
    const startWaypoint = first.direction == first.segment?.endPoint.name ? first.segment.startPoint.name : first.segment?.endPoint.name;
    const endWaypoint = last.direction == last.segment?.endPoint.name ? last.segment.endPoint.name : first.segment?.startPoint.name;
    return [startWaypoint, endWaypoint];
  };

  const trips = tripData.slice(0).reverse().map((t) => (
    <Row className="mb-1">
        <Container className="py-2 px-2 rounded">
          <Row>
            <Col className="col-md-auto">
              {/* <img src="https://via.placeholder.com/150" alt="trip-map-img"></img> */}
            </Col>
            <Col>
              <h5 className="text-center">Z: {edgeWaypoints(t.plan)[0]} Do: {edgeWaypoints(t.plan)[1]}</h5>
              { t.documentation && t.documentation.status ? (
                <Alert className="pt-2 pb-1" variant={t.documentation.status.status === "Verified" ? "success" : "warning"}>
                  <h5 className="text-center">Status wniosku: {t.documentation.status.status === "Verified" ? "Zweryfikowany" : "Oczekuje na weryfikację"}</h5>
                </Alert>
              ) : null }
              <Row>
                <Col>
                  <h5>Data wycieczki: {t.startDate}</h5>
                  <h5>Odznaka: GOT {t.badge.type.type} {t.badge.level.level}</h5>
                </Col>
                <Col>
                  <h4 className="float-end">Punkty GOT: {t.points}</h4>
                </Col>
              </Row>
            </Col>
          </Row>
          <hr/>
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
      </Row>
      <Row className="rounded bg-light py-3 px-2 mt-4">
        <Col className="col-md-auto">
          <img className="rounded" src="https://via.placeholder.com/150" alt="tourist-img"></img>
        </Col>
        <Col>
          {touristName}
          {touristBadge}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="py-2 bg-light">
          <h2 className="mb-3">Wycieczki - okres odznaki 2022</h2>
          {trips}
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
