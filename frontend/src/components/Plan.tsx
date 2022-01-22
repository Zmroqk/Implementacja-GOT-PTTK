import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import MountainGroup from "../apiEntities/MountainGroup.entity";
import MountainRange from "../apiEntities/MountainRange.entity";
import Waypoint from "../apiEntities/Waypoint.entity";
import { Segment as SegmentEntity } from "../apiEntities/Segment.entity";

interface IPlanState {
	mountainGroups: MountainGroup[];
	mountainRanges: MountainRange[];
	waypoints: Waypoint[];
	segments: SegmentEntity[];
}

interface IPlanFormState {
 	startPointId?: number;
  endPointId?: number;
  viaPointsCount: number;
}

export default function Plan() {
  const [data, setData] = useState<IPlanState>({
		mountainGroups: [],
		mountainRanges: [],
		waypoints: [],
		segments: [],
	});

  const waypointStartRef = useRef<HTMLSelectElement>(null);
  const waypointEndRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
		fetch("http://localhost:3001/admin/segment/create")
			.then((data) => data.json())
			.then((jsonData) => {
				setData(jsonData);
			});
	}, []);

  const [formData, setFormData] = useState<IPlanFormState>({
     viaPointsCount: 0,
  });

  const segmentsOptions = data.segments.map((s) => (
    <option key={s.id} value={s.id}>
      {s.name}
    </option>
  ))

  const segmentsForms = [];
  for (var i = 0; i < formData.viaPointsCount; i += 1) {
    segmentsForms.push(
      <>
        <Form.Group controlId={"segment-" + i}>
					<Form.Label>Odcinek {i + 1}</Form.Label>
            <Form.Select>
              {segmentsOptions}
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
            <Form.Group controlId="startSegmentId">
            <Form.Label>Odcinek początkowy</Form.Label>
              <Form.Select>
                {segmentsOptions}
              </Form.Select>
            </Form.Group>

            <div>
              <Button
              onClick={() => setFormData({
                ...formData,
                viaPointsCount: formData.viaPointsCount + 1,
              })}>
              Dodaj kolejny odcinek
              </Button>
            </div>

            <div>
              <Button
              onClick={() => {
                if (formData.viaPointsCount > 0) {
                  setFormData({
                    ...formData,
                    viaPointsCount: formData.viaPointsCount - 1,
                  })
                }
              }}>
              Usuń ostatni
              </Button>
            </div>

            {segmentsForms}

            <Container>
              <h4>Punkty GOT: ---</h4>
            </Container>

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
