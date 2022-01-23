import React, { Fragment, useEffect, useState } from "react";
import { Container, Button, ListGroup, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import MountainGroup from "../apiEntities/MountainGroup.entity";
import MountainRange from "../apiEntities/MountainRange.entity";
import Waypoint from "../apiEntities/Waypoint.entity";
import { Segment as SegmentEntity } from "../apiEntities/Segment.entity";

interface ISegmentState {
	mountainGroups: MountainGroup[];
	mountainRanges: MountainRange[];
	waypoints: Waypoint[];
	segments: SegmentEntity[];
}

export default function Segment() {
	const [data, setData] = useState<ISegmentState>({
		mountainGroups: [],
		mountainRanges: [],
		waypoints: [],
		segments: [],
	});

	const [selectedRange, setSelectedRange] = useState<
		MountainRange | undefined
	>(undefined);

	useEffect(() => {
		fetch("http://localhost:3001/admin/segment/create")
			.then((data) => data.json())
			.then((jsonData) => setData(jsonData));
	}, []);

	const groups = data.mountainGroups.map((mg) => (
		<ListGroup key={mg.id}>
			<ListGroup.Item>{mg.name}</ListGroup.Item>
			{mg.mountainRanges.map((mr) => (
            <Row>
               <Col xs={1}/>
               <Col xs={10}>
                  <ListGroup.Item action
                     key={`item-${mr.id}}`}
                     onClick={(e) => {
                        setSelectedRange(mr);
                     }}
                  >
                     {mr.name}
                  </ListGroup.Item>
               </Col>             
               <Col xs={1}/>
            </Row>		
			))}
		</ListGroup>
	));

	const filteredSegments = data.segments.filter((seg) => {
		if (selectedRange) {
			return (
				seg.startPoint.mountainRange.id === selectedRange.id ||
				seg.endPoint.mountainRange.id === selectedRange.id
			);
		}
		return false;
	});

	const segments = filteredSegments.map((seg) => (
      <Link to={`/admin/segment/${seg.id}`} style={{textDecoration: 'none'}}>
		   <ListGroup.Item action>			
				{seg.startPoint.name}-{seg.endPoint.name}
		   </ListGroup.Item>
      </Link>
	));
	return (
		<Fragment>
			<Container className="mt-4">
            <Link to="/admin/segment/new">
               <Button>
                  Dodaj nowy odcinek
               </Button>
            </Link>
				{!selectedRange ? groups : segments}
			</Container>
		</Fragment>
	);
}
