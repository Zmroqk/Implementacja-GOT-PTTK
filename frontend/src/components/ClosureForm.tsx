import { Button, Container, Form, FormControl } from "react-bootstrap";
import MountainGroup from "../apiEntities/MountainGroup.entity";
import MountainRange from "../apiEntities/MountainRange.entity";
import Waypoint from "../apiEntities/Waypoint.entity";
import { Segment as SegmentEntity } from "../apiEntities/Segment.entity";
import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Closure } from "../apiEntities/Closure.entity";

interface IClosureState {
	mountainGroups: MountainGroup[];
	mountainRanges: MountainRange[];
	segments: SegmentEntity[];
    closures: Closure[];
}

interface IClosureFormState {
	mgId?: number;
	mrId?: number;
	sId?: number;
}

interface IClosureFormProps {
	closureId?: number;
}

export function ClosureForm({ closureId }: IClosureFormProps) {
	const [data, setData] = useState<IClosureState>({
		mountainGroups: [],
		mountainRanges: [],
		segments: [],
        closures: [],
	});

	const mountainGroupRef = useRef<HTMLSelectElement>(null);
	const mountainRangeRef = useRef<HTMLSelectElement>(null);
    const segmentRef = useRef<HTMLSelectElement>(null);
    const startDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);
    const reasonRef = useRef<HTMLInputElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		fetch("http://localhost:3001/admin//closure/close")
			.then((data) => data.json())
			.then((jsonData) => {
				setData(jsonData);
				setFormData({
					...formData,
					mgId: jsonData.mountainGroups[0].id,
					mrId: jsonData.mountainRanges[0].id,
                    sId: jsonData.segments[0].id,
				} as IClosureFormState);
			});
	}, []);

	const [formData, setFormData] = useState<IClosureFormState>({
	} as IClosureFormState);
	const mountainGroupsOptions = data.mountainGroups.map((mg) => (
		<option key={mg.id} value={mg.id}>
			{mg.name}
		</option>
	));
	let mountainRangesOptions;
	if (formData.mgId) {
		const mountainGroup = data.mountainGroups.find(
			(mg) => mg.id == formData.mgId
		);
		console.log(mountainGroup);
		if (mountainGroup)
			mountainRangesOptions = mountainGroup.mountainRanges.map((mr) => (
				<option key={mr.id} value={mr.id}>
					{mr.name}
				</option>
			));
	} else
		mountainRangesOptions = data.mountainRanges.map((mr) => (
			<option key={mr.id} value={mr.id}>
				{mr.name}
			</option>
		));

    let dateSelect = null;
	let segmentSelect = null;
	if (formData.mgId && formData.mrId) {
		/*
		const segments = data.segments.filter(
			(s) => s.mountainRange.id === formData.mrId
		);
		*/
		const segments = data.segments;
		const waypointsOptions = segments.map((s) => (
			<option key={s.id} value={s.id}>
				{s.startPoint.name} - {s.endPoint.name}
			</option>
		));
		segmentSelect = (
			<Fragment>
				<Form.Group controlId="segmentId">
					<Form.Label>Odcinek</Form.Label>
					<Form.Select
						ref={segmentRef}
						onChange={(e) => {
							setFormData({
								...formData,
								sId: Number.parseInt(e.currentTarget.value),
							});
						}}
					>
						{waypointsOptions}
					</Form.Select>
				</Form.Group>
			</Fragment>
		);
        dateSelect = (
            <Fragment>
                <Form.Group controlId="dateFromId">
					<Form.Label>Data zamknięcia</Form.Label>
					<FormControl
						ref={startDateRef}
						type="date"
						placeholder="Podaj liczbę punktow"
					/>
				</Form.Group>
				<Form.Group controlId="dateToId">
					<Form.Label>Data otwarcia</Form.Label>
					<FormControl
						ref={endDateRef}
						type="date"
						placeholder="Podaj liczbę punktow"
					/>
				</Form.Group>
                <Form.Group controlId="reason">
						<Form.Label>Powód zamknięcia</Form.Label>
						<Form.Control
							ref={reasonRef}
							type="text"
							placeholder="Podaj powód zamknięcia"
						/>
					</Form.Group>
            </Fragment>
        )
	}

	const navigate = useNavigate();

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (buttonRef.current) {
			buttonRef.current.disabled = true;
		}
		if (
			segmentRef.current &&
			startDateRef.current &&
			endDateRef.current &&
            reasonRef.current
		) {
			const body = {
				segmentFormId: Number.parseInt(segmentRef.current.value),
				closedFrom: startDateRef.current.value,
                closedTo: endDateRef.current.value,
                reason: reasonRef.current.value,
			};
			fetch("http://localhost:3001/admin/segment/create", {
				method: "POST",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
			}).then((res) => {
				if (res.status == 200) {
					navigate("/admin/closure")
				}
            else {
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
			<Link to="/admin/segment">
				<Button>Powrót</Button>
			</Link>
			<Form onSubmit={onSubmit}>
				<Form.Group controlId="mountainGroupId">
					<Form.Label>Grupa górska</Form.Label>
					<Form.Select
						ref={mountainGroupRef}
						onChange={(e) => {
							setFormData({
								...formData,
								mgId: Number.parseInt(e.currentTarget.value),
							});
						}}
					>
						{mountainGroupsOptions}
					</Form.Select>
				</Form.Group>
				<Form.Group controlId="mountainRangeId">
					<Form.Label>Łańcuch górski</Form.Label>
					<Form.Select
						ref={mountainRangeRef}
						onChange={(e) => {
							setFormData({
								...formData,
								mrId: Number.parseInt(e.currentTarget.value),
							});
						}}
					>
						{mountainRangesOptions}
					</Form.Select>
				</Form.Group>
				{segmentSelect}
                {dateSelect}
				<Button type="submit" ref={buttonRef}>
					Zamknij odcinek
				</Button>
			</Form>
		</Container>
	);
}
