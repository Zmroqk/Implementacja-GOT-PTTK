import React, { Fragment, useEffect, useState } from "react";
import {
	Container,
	Row,
	Col,
	Card,
	Button,
	ButtonGroup,
	ListGroup,
	ToggleButton,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Application, {
	ApplicationStatus,
} from "../apiEntities/Application.entity";
import MountainGroup from "../apiEntities/MountainGroup.entity";
import { Leader as LeaderEntity } from "../apiEntities/Leader.entity";

interface ILeaderState {
	mountainGroups: MountainGroup[];
	leaders: LeaderEntity[];
	applications: Application[];
}

export default function Leader() {
	const [data, setData] = useState<ILeaderState>({
		mountainGroups: [],
		leaders: [],
		applications: [],
	});

	const [flag, setFlag] = useState(0);

	const [applications, setApplications] = useState<Application[]>([]);

	const [leaders, setLeaders] = useState<LeaderEntity[]>([]);

	const [radioValue, setRadioValue] = useState("1");

	useEffect(() => {
		fetch("http://localhost:3001/admin/application")
			.then((data) => data.json())
			.then((jsonData) => setApplications(jsonData));
	}, [flag]);

	useEffect(() => {
		fetch("http://localhost:3001/leader/leader")
			.then((data) => data.json())
			.then((jsonData) => setLeaders(jsonData));
	}, [flag]);

	const acceptHandler = function (index: number) {
		fetch(`http://localhost:3001/admin/application/accept/${index}`, {
			method: "POST",
		}).then((data) => {
			if (data.status == 200 || data.status == 201) setFlag(flag + 1);
		});
	};

	const declineHandler = function (index: number) {
		fetch(`http://localhost:3001/admin/application/decline/${index}`, {
			method: "POST",
		}).then((data) => {
			if (data.status == 200 || data.status == 201) setFlag(flag + 1);
		});
	};

	const applicationsList = applications
		.filter((app) => app.status === ApplicationStatus.Pending)
		.map((app) => (
			<ListGroup key={app.id}>
				<ListGroup.Item key={`application-item-${app.id}`}>
					{app.type.type} {app.applicant.user.name}{" "}
					{app.applicant.user.surname} {app.submissionDate}{" "}
					<Button onClick={() => declineHandler(app.id)}>
						Odrzuć aplikację
					</Button>{" "}
					<Button onClick={() => acceptHandler(app.id)}>
						Zatwierdz aplikację
					</Button>
				</ListGroup.Item>
			</ListGroup>
		));

	const leadersList = leaders.map((l) => (
		<ListGroup key={l.id}>
			<ListGroup.Item key={`leader-item-${l.id}`}>
				<Card>
					<Card.Body>
						<Card.Title>
							{l.tourist.user.name} {l.tourist.user.surname}
						</Card.Title>
						<Card.Text>
							<p>
								{"Data mianowania: "} {l.nominateDate} {"\n"}
							</p>
							<p>
								{"Uprawnienia: \n"}
								{l.legitimation.mountainGroups.map(
									(mg) => mg.name + " "
								)}
							</p>
						</Card.Text>
						<Link to={`/admin/leader/${l.id}`}>
							<Button variant="primary">Edytuj</Button>
						</Link>
					</Card.Body>
				</Card>
			</ListGroup.Item>
		</ListGroup>
	));

	return (
		<Fragment>
			<Container className="mt-4">
				<Row>
					<Col>
						<div>
							<h2>Przodownicy</h2>
						</div>
						<div>
							<ButtonGroup>
								<ToggleButton
									key={1}
									id={`radio-leader-1`}
									type="radio"
									variant={"outline-primary"}
									name="radio-leader"
									value={1}
									checked={radioValue === "1"}
									onChange={(e) => {
										setRadioValue(e.currentTarget.value);
									}}
								>
									Aktywni przodownicy
								</ToggleButton>
								<ToggleButton
									key={2}
									id={`radio-leader-2`}
									type="radio"
									variant={"outline-primary"}
									name="radio-leader"
									value={2}
									checked={radioValue === "2"}
									onChange={(e) => {
										setRadioValue(e.currentTarget.value);
									}}
								>
									Wnioski
								</ToggleButton>
							</ButtonGroup>
						</div>
					</Col>
					<Col>// TODO Clock</Col>
				</Row>
				<Row>{radioValue === "1" ? leadersList : applicationsList}</Row>
			</Container>
		</Fragment>
	);
}
