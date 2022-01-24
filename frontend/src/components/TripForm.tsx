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
   const userId = 2;

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
   
   useEffect(() => {
      fetch(`http://localhost:3001/tourist/badge/ongoing/${userId}`)
         .then((badgeData) => badgeData.json())
         .then((jsonData) => setBadgeData(jsonData));
   }, []);


   const planId = useParams()["id"];

   const tripPlan = tripData.find((tp) => tp.id == Number(planId));
   const tripPlanSegments = tripPlan?.tripSegments.map((ts, idx) => (
      <tr>
         <td>{idx + 1}</td>
         <td>{ts.segment?.name}</td>
         <td>{ts.direction}</td>
         <td>{ts.segment?.endPoint.name == ts.direction ? ts.segment.points : ts.segment?.pointsReverse}</td>
      </tr>
   ));

   const [validated, setValidated] = useState(false);
   const [alertVisible, setAlertVisible] = useState(false);

   const startDateRef = useRef<HTMLInputElement>(null);
	const endDateRef = useRef<HTMLInputElement>(null);
	const leaderPresentRef = useRef<HTMLInputElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

   const dateSelect = (
      <Fragment>
         <Form.Group controlId="dateFromId">
            <Form.Label>Data rozpoczęcia</Form.Label>
            <FormControl
               required
               ref={startDateRef}
               type="datetime-local"
            />
            <Form.Control.Feedback type="invalid">Wprowadź datę i czas rozpoczęcia wycieczki.</Form.Control.Feedback>
         </Form.Group>
         <Form.Group controlId="dateToId">
            <Form.Label>Data zakończenia</Form.Label>
            <FormControl
               required
               ref={endDateRef}
               type="datetime-local"
            />
            <Form.Control.Feedback type="invalid">Wprowadź datę i czas zakończenia wycieczki.</Form.Control.Feedback>
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

      if (e.currentTarget.checkValidity() === false) {
         e.stopPropagation();
      }
      setValidated(true)

		if (buttonRef.current) {
			buttonRef.current.disabled = true;
		}
		if (
			startDateRef.current &&
			endDateRef.current && 
			leaderPresentRef.current
		) {
			const body = {
				userId: userId,
            tripPlanId: Number(planId),
            dateStart: startDateRef.current.value,
            dateEnd: endDateRef.current.value,
            isLeaderPresent: leaderPresentRef.current.checked,
			};

			fetch("http://localhost:3001/tourist/trip/create/plan", {
				method: "POST",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
			}).then((res) => {
				if (res.status == 200 || res.status == 201) {
					navigate("/tourist/badge");
				}
            else if(buttonRef.current){
               buttonRef.current.disabled = false;
               setAlertVisible(true);
               setValidated(false);
               // TODO unlock button and do something
            }
			});
		}
	};

   // let badgeImgPath = "https://via.placeholder.com/150"
   // if (badgeData.badge.level) {
   //    if (badgeData.badge.level.level == "Brązowa") {
   //       badgeImgPath = "/mala_braz.png";
   //    } else if (badgeData.badge.level.level == "Srebrna") {
   //       badgeImgPath = "/mala_srebr.png";
   //    } else if (badgeData.badge.level.level == "Złota") {
   //       badgeImgPath = "/mala_zlota.png";
   //    }
   // }

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
                  { badgeData.badge.type && badgeData.badge.level ? (
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
                     <th>Kierunek</th>
                     <th>Punkty GOT</th>
                  </tr>
               </thead>
               <tbody>
                  {tripPlanSegments}
               </tbody>
            </Table>
            </Row>

            <Form noValidate validated={validated} onSubmit={onSubmit}>
               <Row>
                  {dateSelect}
               </Row>

               <Form.Group controlId="formFileMultiple" className="mb-3">
                  <Form.Label>Dodaj dowody przebycia wycieczki</Form.Label>
                  <Form.Control type="file" multiple />
               </Form.Group>

               <Button type="submit" ref={buttonRef}>
                  Zapisz wycieczkę
               </Button>
            </Form>
         </Col>
      </Row>

      { alertVisible ? (
      <Alert
         variant="danger"
         className="mt-3">
         <h5>Niepoprawne daty</h5>
         <p>Wprowadzone daty rozpoczęcia i zakończenia wycieczki są niepoprawne</p>
      </Alert>
      ) : null }
    </Container>
  );
}
