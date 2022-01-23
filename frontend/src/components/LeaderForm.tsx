import { Button, Container, Form } from "react-bootstrap";
import MountainGroup from "../apiEntities/MountainGroup.entity";
import { Leader as LeaderEntity } from "../apiEntities/Leader.entity";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface ILeaderState {
	mountainGroups: MountainGroup[];
	leaders: LeaderEntity[];
}

interface ILeaderFormState {
	mgIds?: [];
}

export function Leaderform(leaderId : number){

    const [data, setData] = useState<ILeaderState>({
		mountainGroups: [],
        leaders: [],
	});

    const [leaders, setLeaders] = useState<LeaderEntity[]>([]);
    const [mountainGroups, setMountainGroups] = useState<MountainGroup[]>([]);

    const mountainGroupRef = useRef<HTMLSelectElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
		fetch("http://localhost:3001/leader/leader")
			.then((data) => data.json())
			.then((jsonData) => {
				setLeaders(jsonData);
				setFormData({
					...formData,
					mgIds: jsonData.leaders,
				} as ILeaderFormState);
			});
	}, []);

    useEffect(() => {
		fetch("http://localhost:3001/tourist/moutainGroups")
			.then((data) => data.json())
			.then((jsonData) => setMountainGroups(jsonData));
	}, []);

    const [formData, setFormData] = useState<ILeaderFormState>(
		{} as ILeaderFormState
	);

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
		if (
			segmentRef.current 
		) {
			const body = {
				segmentId: Number.parseInt(segmentRef.current.value),
				dateStart: startDateRef.current.value,
				dateEnd: endDateRef.current.value,
				reason: reasonRef.current.value,
			};
			fetch("http://localhost:3001/admin/closure/close", {
				method: "POST",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
			}).then((res) => {
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

    return (
        <Container>
            <Link to="/admin/leader">
				<Button>Powrót</Button>
			</Link>
            <Form onSubmit={onSubmit}>
				<Form.Group controlId="mountainGroupId">
					<Form.Label>Grupy górskie, do których przodownik ma uprawnienia</Form.Label>
					<Form.Control
                        as="select"
						ref={mountainGroupRef}
                        multiple value=
						onChange={(e) => {
							setFormData({
								...formData,
								mgId: Number.parseInt(e.currentTarget.value),
							});
						}}
					>
						{mountainGroupsOptions}
					</Form.Control>
				</Form.Group>
				<Button type="submit" ref={buttonRef}>
					Zamknij odcinek
				</Button>
			</Form>
        </Container>
    );
}