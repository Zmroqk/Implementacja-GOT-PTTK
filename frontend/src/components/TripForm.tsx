import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { Container, Row, Col, Table, Form, FormControl, Button, Alert } from 'react-bootstrap';
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { Badge as BadgeEntity } from '../apiEntities/Badge.entity'
import { TripPlan } from "../apiEntities/TripPlan.entity";

interface IBadgeState {
	badge: BadgeEntity;
  points: number;
}

interface ITripFormProps {
	planId?: number;
}

export default function TripForm() {
   const [tripData, setTripData] = useState<TripPlan[]>([]);

   useEffect(() => {
         fetch("http://localhost:3001/Tourist/tripplan")
            .then((tripData) => tripData.json())
            .then((jsonData) => setTripData(jsonData));
      }, []);


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


   const planId = useParams()["id"];

   const tripPlan = tripData.find((tp) => tp.id == Number(planId));
   const tripPlanSegments = tripPlan?.tripSegments.map((ts, idx) => (
      <tr>
         <td>{idx + 1}</td>
         <td>{ts.segment?.name}</td>
         <td>{ts.segment?.endPoint.name == ts.direction ? ts.segment.points : ts.segment?.pointsReverse}</td>
      </tr>
   ));

   const startDateRef = useRef<HTMLInputElement>(null);
	const endDateRef = useRef<HTMLInputElement>(null);
	const leaderPresentRef = useRef<HTMLInputElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

   const dateSelect = (
      <Fragment>
         <Form.Group controlId="dateFromId">
            <Form.Label>Data rozpoczęcia</Form.Label>
            <FormControl
               ref={startDateRef}
               type="datetime-local"
               placeholder="Podaj liczbę punktow"
            />
         </Form.Group>
         <Form.Group controlId="dateToId">
            <Form.Label>Data zakończenia</Form.Label>
            <FormControl
               ref={endDateRef}
               type="datetime-local"
               placeholder="Podaj liczbę punktow"
            />
         </Form.Group>
         <Row className="mt-3">
            <Col className="col-md-auto">
               <Form.Label>Obecność przodownika</Form.Label>
            </Col>
            <Col className="col-md-auto">
               <Form.Check
               type="switch"
               ref={leaderPresentRef}
               />
            </Col>
         </Row>
      </Fragment>
   );

   const navigate = useNavigate();

   const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (buttonRef.current) {
			// buttonRef.current.disabled = true;
		}
		if (
			startDateRef.current &&
			endDateRef.current && 
			leaderPresentRef.current
		) {
			const body = {
				userId: 2,  // TODO: hardcoded
            tripPlanId: Number(planId),
            dateStart: startDateRef.current.value,
            dateEnd: endDateRef.current.value,
            idLeaderPresent: leaderPresentRef.current.checked,
			};

         console.log(body);

			fetch("http://localhost:3001/tourist/trip/create/plan", {
				method: "POST",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
			}).then((res) => {
				if (res.status == 200 || res.status == 201) {
					// navigate("/tourist/badge");
				}
            else {
               // TODO unlock button and do something
            }
			});
		}
	};

  return (
    <Container className="my-4">
      <Row>
         <Col>
            <Row>
               <h3>Tworzenie wycieczki</h3>
            </Row>

            <Alert className="text-center" variant="dark">
               <Col>
                  <h5>Aktualnie zdobywana odznaka:</h5>
                  { badgeData.badge.type ? (
                  <>
                     <h5 className="text-center">GOT {badgeData.badge.type.type} {badgeData.badge.level.level}</h5>
                     <h5>Punkty GOT: {badgeData.points}</h5>
                  </>
               ) : null }
              </Col>
              <Col>
                  
              </Col>
            </Alert>

            <Row>
            <Table striped bordered hover>
               <thead>
                  <tr>
                     <th>L.p.</th>
                     <th>Odcinek</th>
                     <th>Punkty GOT</th>
                  </tr>
               </thead>
               <tbody>
                  {tripPlanSegments}
               </tbody>
            </Table>
            </Row>

            <Form onSubmit={onSubmit}>
               <Row>
                  {dateSelect}
               </Row>

               {/* TODO Pliki tak naprawde nie dzialaja */}
               <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Label>Multiple files input example</Form.Label>
                  <Form.Control type="file" multiple />
               </Form.Group>

               <Button type="submit" ref={buttonRef}>
                  Zapisz wycieczkę
               </Button>
            </Form>
         </Col>
      </Row>
    </Container>
  );
}
