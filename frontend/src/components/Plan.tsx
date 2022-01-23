import { ChangeEvent, FormEvent, Fragment, useEffect, useRef, useState } from "react";
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

type SegmentInput = {
  segmentId: number
}

export default function Plan() {
  const [data, setData] = useState<IPlanState>({
		mountainGroups: [],
		mountainRanges: [],
		waypoints: [],
		segments: [],
	});

  // Hardcoded segment id
  const [formInputs, setFormInputs] = useState<SegmentInput[]>([{segmentId: 1} as SegmentInput]);
  console.log(formInputs);

  const handleInputChange = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
    e.preventDefault();
    const { name, value } = e.target;
    const list = [...formInputs];
    list[index].segmentId = Number.parseInt(value);
    setFormInputs(list);
  };

  // TODO Przy remove rozjezdza sie wartosc w select i wartosc w formInputs
  const handleRemoveClick = (index: number) => {
    const list = [...formInputs];
    list.splice(index, 1);
    setFormInputs(list);
  };

  const handleAddClick = () => {
    setFormInputs([...formInputs, { segmentId: 1 } as SegmentInput]);
  };
  
  useEffect(() => {
		fetch("http://localhost:3001/admin/segment/create")
			.then((data) => data.json())
			.then((jsonData) => {
				setData(jsonData);
			});
	}, []);

  const segmentsOptions = data.segments.map((s) => (
    <option key={s.id} value={s.id}>
      {s.name}
    </option>
  ))

  const segmentsForms = formInputs.map((s, i) => {
    return (
    <>
      <Form.Group controlId={"segment-" + i}>
        <Form.Label>Odcinek {i}</Form.Label>
        <Form.Select onChange={e => handleInputChange(e, i)}>
          {segmentsOptions}
        </Form.Select>
      </Form.Group>
      <div>
        {formInputs.length !== 1 && <Button type="button"
          onClick={() => handleRemoveClick(i)}>Remove</Button>}
        {formInputs.length - 1 === i && <Button type="button" onClick={handleAddClick}>Add</Button>}
      </div>
    </>
    )
  });

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
