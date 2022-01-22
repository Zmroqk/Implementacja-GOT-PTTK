import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Waypoint from "../apiEntities/Waypoint.entity";

interface IPlanState {
	waypoints: Waypoint[];
}

interface IPlanFormState {
	startPointId?: number;
  endPointId?: number;
  viaPointsCount: number;
}

export default function Plan() {
  const waypointStartRef = useRef<HTMLSelectElement>(null);
  const waypointEndRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    fetch("http://localhost:3001/admin/segment/create")
      .then((data) => data.json())
      .then((jsonData) => {
        setData(jsonData);
        setFormData({
          ...formData,
          startPointId: jsonData.waypoints[0].id,
          viaPointsCount: 0
        } as IPlanFormState);
      });
  }, []);

  const [data, setData] = useState<IPlanState>({
    waypoints: []
  });

  const [formData, setFormData] = useState<IPlanFormState>({
    viaPointsCount: 0
  });

  const waypointsOptions = data.waypoints.map((w) => (
    <option key={w.id} value={w.id}>
      {w.name}
    </option>
  ))

  console.log(formData.viaPointsCount);

  const intermediateWaypoints = [];
  for (var i = 0; i < formData.viaPointsCount; i += 1) {
    intermediateWaypoints.push(
      <>
        <Form.Group controlId='intermediate-${i}'>
					<Form.Label>Punkt pośredni {i}</Form.Label>
            <Form.Select>
              {waypointsOptions}
            </Form.Select>
				</Form.Group>
      </>
    );
  };

  return (
    <>
    <Container className="mt-4">
        <Col>
          <h2>Planowanie wycieczki</h2>
          <Form>
            <Form.Group controlId="waypointStartId">
              <Form.Label>Punkt startowy</Form.Label>
              <Form.Select onChange={(e) => {
                setFormData({
                  ...formData,
                  startPointId: Number.parseInt(e.currentTarget.value),
                });
              }}>
                {waypointsOptions}
              </Form.Select>
            </Form.Group>

            <div>
              <Button
              onClick={() => setFormData({
                ...formData,
                viaPointsCount: formData.viaPointsCount + 1,
              })}>
              Dodaj punkt pośredni
              </Button>
            </div>

            {intermediateWaypoints}

            <Form.Group controlId="waypointEndId">
              <Form.Label>Punkt końcowy</Form.Label>
              <Form.Select>
                {waypointsOptions}
              </Form.Select>
            </Form.Group>
            <Button type="submit">
              Utwórz plan wycieczki
            </Button>
          </Form>
        </Col>
        <Col>
        </Col>
    </Container>
  </>
  )
}
