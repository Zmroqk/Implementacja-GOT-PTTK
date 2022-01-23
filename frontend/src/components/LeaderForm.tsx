import { Button, Card, Container, Form } from "react-bootstrap";
import MountainGroup from "../apiEntities/MountainGroup.entity";
import { Leader as LeaderEntity } from "../apiEntities/Leader.entity";
import {
	ChangeEventHandler,
	FormEvent,
	useEffect,
	useRef,
	useState,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

interface ILeaderState {
	mountainGroups: MountainGroup[];
	leaders: LeaderEntity[];
}

interface ILeaderFormState {
	mgIds: any[];
}

export function LeaderForm() {
	const params = useParams();
	const [data, setData] = useState<ILeaderState>({
		mountainGroups: [],
		leaders: [],
	});
	const [leaders, setLeaders] = useState<LeaderEntity[]>([]);
	const [mountainGroups, setMountainGroups] = useState<MountainGroup[]>([]);

	const mountainGroupRef = useRef<HTMLSelectElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const [formData, setFormData] = useState<ILeaderFormState>(
		{} as ILeaderFormState
	);

	useEffect(() => {
		fetch("http://localhost:3001/leader/leader")
			.then((data) => data.json())
			.then((jsonData) => {
				setLeaders(jsonData);
				let data = jsonData ? jsonData : [];
				const leader: LeaderEntity = data.find(
					(leader: { id: any }) => leader.id == Number.parseInt(params.id!)
				);
				if (leader) {
					let ids = leader.legitimation.mountainGroups.map(
						(mg: { id: any }) => mg.id
					);
					setFormData({
						...formData,
						mgIds: ids,
					} as ILeaderFormState);
				}
			});
	}, []);

	useEffect(() => {}, [leaders]);

	useEffect(() => {
		fetch("http://localhost:3001/tourist/mountainGroup")
			.then((data) => data.json())
			.then((jsonData) => setMountainGroups(jsonData));
	}, []);

	const mountainGroupsOptions = mountainGroups.map((mg) => (
		<option key={mg.id} value={mg.id}>
			{mg.name}
		</option>
	));

	const navigate = useNavigate();

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (buttonRef.current) {
			buttonRef.current.disabled = true;
		}
		if (mountainGroupRef.current) {
			const body = formData.mgIds;
			fetch(
				`http://localhost:3001/admin/Legitimation/${Number.parseInt(
					params.id!
				)}`,
				{
					method: "PATCH",
					body: JSON.stringify(body),
					headers: {
						"Content-Type": "application/json",
					},
				}
			).then((res) => {
				if (res.status == 200 || res.status == 201) {
					navigate("/admin/leader");
				} else {
					if (buttonRef.current) {
						buttonRef.current.disabled = false;
					}
					// TODO unlock button and do something
				}
			});
		}
	};

	const chosenLeader = leaders.find(
		(l) => l.id === Number.parseInt(params.id!)
	);

	return (
		<Container>
			<Link to="/admin/leader">
				<Button>Powrót</Button>
			</Link>
			{chosenLeader ? (
				<Card>
					<Card.Body>
						<Card.Title>
							{chosenLeader.tourist.user.name}{" "}
							{chosenLeader.tourist.user.surname}
						</Card.Title>
						<Card.Text>
							<p>
								{"Data mianowania: "} {chosenLeader.nominateDate} {"\n"}
							</p>
							<p>
								{"Uprawnienia: \n"}
								{chosenLeader.legitimation.mountainGroups.map(
									(mg) => mg.name + " "
								)}
							</p>
						</Card.Text>
						<Link to={`/admin/leader/${chosenLeader.id}`}>
							<Button variant="primary">Edytuj</Button>
						</Link>
					</Card.Body>
				</Card>
			) : null}
			<Form onSubmit={onSubmit}>
				<Form.Group controlId="mountainGroupId">
					<Form.Label>
						Grupy górskie, do których przodownik ma uprawnienia
					</Form.Label>
					<Form.Control
						as="select"
						ref={mountainGroupRef}
						multiple
						value={formData.mgIds}
						onChange={(e: any) => {
							const selectedOptions = [];
							for (const option of e.target.options) {
								if (option.selected) {
									selectedOptions.push(option.value);
								}
							}
							setFormData({
								...formData,
								mgIds: selectedOptions,
							});
						}}
					>
						{mountainGroupsOptions}
					</Form.Control>
				</Form.Group>
				<Button type="submit" ref={buttonRef}>
					Zapisz zmiany
				</Button>
			</Form>
		</Container>
	);
}
