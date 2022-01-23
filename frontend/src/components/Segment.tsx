import React, { Fragment, useEffect, useState } from "react";
import { Container, Button, ListGroup } from "react-bootstrap";
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
				<ListGroup.Item
					key={`item-${mr.id}}`}
					onClick={(e) => {
						setSelectedRange(mr);
					}}
				>
					{mr.name}
				</ListGroup.Item>
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
		<ListGroup.Item>
			<Link to={`/admin/segment/${seg.id}`}>
				{seg.startPoint.name}-{seg.endPoint.name}
			</Link>
		</ListGroup.Item>
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
