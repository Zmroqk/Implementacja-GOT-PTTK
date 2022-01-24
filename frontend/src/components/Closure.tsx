import React, { Fragment, useEffect, useState } from "react";
import {
	Button,
	Col,
	Row,
	ToggleButton,
	ButtonGroup,
	ListGroup,
} from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import { Link } from "react-router-dom";
import MountainGroup from "../apiEntities/MountainGroup.entity";
import MountainRange from "../apiEntities/MountainRange.entity";
import { Closure as ClosureEntity } from "../apiEntities/Closure.entity";
import SegmentEntity from "../apiEntities/Segment.entity";

interface IClosureState {
	mountainGroups: MountainGroup[];
	mountainRanges: MountainRange[];
	closures: ClosureEntity[];
	segments: SegmentEntity[];
}

export default function Closure() {
	const [flag, setFlag] = useState(0);

	const [data, setData] = useState<IClosureState>({
		mountainGroups: [],
		mountainRanges: [],
		closures: [],
		segments: [],
	});

	const [closures, setClosures] = useState<ClosureEntity[]>([]);

	const [radioValue, setRadioValue] = useState("1");

	useEffect(() => {
		fetch("http://localhost:3001/admin/segment/create")
			.then((data) => data.json())
			.then((jsonData) => setData(jsonData));
	}, [flag]);

	useEffect(() => {
		fetch("http://localhost:3001/admin/closure")
			.then((data) => data.json())
			.then((jsonData) => setClosures(jsonData));
	}, [flag]);

	const openHandler = function (index: number) {
		fetch(`http://localhost:3001/admin/closure/open/${index}`, {
			method: "POST",
		}).then((data) => {
			if (data.status == 200 || data.status == 201) setFlag(flag + 1);
		});
	};

	const currentClosures = data.mountainGroups.map((mg) => (
		<ListGroup key={mg.id}>
			<ListGroup.Item>{mg.name}</ListGroup.Item>
			{mg.mountainRanges.map((mr) => (
				<ListGroup.Item key={`item-${mr.id}}`}>
					<ListGroup key={mr.id}>
						<ListGroup.Item>{mr.name}</ListGroup.Item>
						<ListGroup>
							{closures
								.filter(
									(cl) =>
										(cl.segment.startPoint.mountainRange.id ===
											mr.id ||
											cl.segment.endPoint.mountainRange.id ===
												mr.id) &&
										new Date(cl.closedTo) > new Date(Date.now()) &&
										new Date(cl.closedFrom) <= new Date(Date.now())
								)
								.map((cl) => (
									<ListGroup.Item action key={`closure-item-${cl.id}`}>
										{cl.segment.name}{"   Zamkniety od:   "}{cl.closedFrom}{"   Zamknięty do:   "}{cl.closedTo}{"      "}
										<Button onClick={() => openHandler(cl.id)}>
											Otwórz odcinek
										</Button>
									</ListGroup.Item>
								))}
						</ListGroup>
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
						<ListGroup>
							{closures
								.filter(
									(cl) =>
										(cl.segment.startPoint.mountainRange.id ===
											mr.id ||
											cl.segment.endPoint.mountainRange.id ===
												mr.id) &&
										new Date(cl.closedFrom) > new Date(Date.now())
								)
								.map((cl) => (
									<ListGroup.Item key={`closure-item-${cl.id}`}>
										{cl.segment.name}{"   Zamkniety od:   "}{cl.closedFrom}{"   Zamknięty do:   "}{cl.closedTo}{"     "}
										<Button onClick={() => openHandler(cl.id)}>
											Anuluj zamknięcie
										</Button>
									</ListGroup.Item>
								))}
						</ListGroup>
					</ListGroup>
				</ListGroup.Item>
			))}
		</ListGroup>
	));

	return (
		<Fragment>
			<Container className="mt-4">
				<Row>
					<Col>
						<div>
							<h2>Zamknięte Odcinki</h2>
							<Link to="/admin/closure/new">
								<Button>Dodaj nowe zamknięcie</Button>
							</Link>
						</div>
						<div>
							<ButtonGroup>
								<ToggleButton
									key={1}
									id={`radio-closure-1`}
									type="radio"
									variant={"outline-primary"}
									name="radio-closure"
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
									id={`radio-closure-2`}
									type="radio"
									variant={"outline-primary"}
									name="radio-closure"
									value={2}
									checked={radioValue === "2"}
									onChange={(e) => {
										setRadioValue(e.currentTarget.value);
									}}
								>
									Planowane zamknięcia
								</ToggleButton>
							</ButtonGroup>
						</div>
					</Col>
					<Col>// TODO Clock</Col>
				</Row>
				<Row>{radioValue === "1" ? currentClosures : futureClosures}</Row>
			</Container>
		</Fragment>
	);
}
