import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, Row, ToggleButton, ButtonGroup, ListGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container';
import { Link } from 'react-router-dom';
import MountainGroup from '../apiEntities/MountainGroup.entity';
import MountainRange from '../apiEntities/MountainRange.entity';
import { Closure } from '../apiEntities/Closure.entity';
import SegmentEntity from '../apiEntities/Segment.entity';

interface IClosureState {
  mountainGroups: MountainGroup[];
  mountainRanges: MountainRange[];
  closures: Closure[];
  segments: SegmentEntity[];
}

export default function Closure() {

  const [data, setData] = useState<IClosureState>({
    mountainGroups: [],
    mountainRanges: [],
    closures: [],
    segments: [],
  });

  useEffect(() => {
    fetch("http://localhost:3001/admin/closure/close")
      .then((data) => data.json())
      .then((jsonData) => setData(jsonData));
  }, []);

  const currentClosures = data.mountainGroups.map((mg) => (
		<ListGroup key={mg.id}>
			<ListGroup.Item>{mg.name}</ListGroup.Item>
			{mg.mountainRanges.map((mr) => (
				<ListGroup.Item key={`item-${mr.id}}`}>
					<ListGroup key={mr.id}>
          <ListGroup.Item>{mr.name}</ListGroup.Item>
          // TODO mapowanie zamknięć teraźniejszych
            </ListGroup>
				</ListGroup.Item>
			))}
		</ListGroup>
	));

  const futureClosures = data.mountainGroups.map((mg) => (
		<ListGroup key={mg.id}>
			<ListGroup.Item>{mg.name}</ListGroup.Item>
			{mg.mountainRanges.map((mr) => (
				<ListGroup.Item key={`item-${mr.id}}`}>
					<ListGroup key={mr.id}>
          <ListGroup.Item>{mr.name}</ListGroup.Item>
          // TODO mapowanie zamknięć teraźniejszych
            </ListGroup>
				</ListGroup.Item>
			))}
		</ListGroup>
	));

  const [radioValue, setRadioValue] = useState('1');

  return (
    <Fragment>
      <Container className="mt-4">
        <Row>
          <Col><div>
            <h2>Zamknięte Odcinki</h2>
            <Link to="/admin/closure/new">
              <Button>
                Dodaj nowe zamknięcie
              </Button>
            </Link></div>
            <div>
              <ButtonGroup>
                <ToggleButton
                  key={1}
                  id={`radio-1`}
                  type="radio"
                  variant={"outline-primary"}
                  name="radio"
                  value={1}
                  checked={radioValue === "1"}
                  onChange={(e) => {
                    setRadioValue(e.currentTarget.value);
                  }}
                >
                  Zamknięte teraz
                </ToggleButton>
                <ToggleButton
                  key={2}
                  id={`radio-2`}
                  type="radio"
                  variant={"outline-primary"}
                  name="radio"
                  value={2}
                  checked={radioValue === "2"}
                  onChange={(e) => {
                    setRadioValue(e.currentTarget.value);
                  }}
                >
                  Planowane zamknięcia
                </ToggleButton>
              </ButtonGroup></div>
          </Col>
          <Col>
                  // TODO Clock
          </Col>
        </Row>
        <Row>
          {radioValue === "1" ? currentClosures : futureClosures}
        </Row>
      </Container>
    </Fragment>
  )
}
