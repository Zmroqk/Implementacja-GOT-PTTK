import { Button, Container, Form } from "react-bootstrap";
import MountainGroup from "../apiEntities/MountainGroup.entity";
import MountainRange from "../apiEntities/MountainRange.entity";
import Waypoint from "../apiEntities/Waypoint.entity";
import { Segment as SegmentEntity } from "../apiEntities/Segment.entity";
import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface ISegmentState {
	mountainGroups: MountainGroup[];
	mountainRanges: MountainRange[];
	waypoints: Waypoint[];
	segments: SegmentEntity[];
}

interface ISegmentFormState {
	mgId?: number;
	mrId?: number;
	wsId?: number;
	weId?: number;
	viaEnabled: boolean;
}

interface ISegmentFormProps {
	segmentId?: number;
}

export function SegmentForm({ segmentId }: ISegmentFormProps) {
	const [data, setData] = useState<ISegmentState>({
		mountainGroups: [],
		mountainRanges: [],
		waypoints: [],
		segments: [],
	});

	const mountainGroupRef = useRef<HTMLSelectElement>(null);
	const mountainRangeRef = useRef<HTMLSelectElement>(null);
	const waypointStartRef = useRef<HTMLSelectElement>(null);
	const waypointEndRef = useRef<HTMLSelectElement>(null);
	const viaRef = useRef<HTMLInputElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		fetch("http://localhost:3001/admin/segment/create")
			.then((data) => data.json())
			.then((jsonData) => {
				setData(jsonData);
				setFormData({
					...formData,
					mgId: jsonData.mountainGroups[0].id,
					mrId: jsonData.mountainRanges[0].id,
				} as ISegmentFormState);
			});
	}, []);

	const [formData, setFormData] = useState<ISegmentFormState>({
		viaEnabled: false,
	} as ISegmentFormState);
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

	let waypointsSelects = null;
	if (formData.mgId && formData.mrId) {
		const waypoints = data.waypoints.filter(
			(w) => w.mountainRange.id === formData.mrId
		);
		const waypointsOptions = waypoints.map((w) => (
			<option key={w.id} value={w.id}>
				{w.name}
			</option>
		));
		waypointsSelects = (
			<Fragment>
				<Form.Group controlId="waypointStartId">
					<Form.Label>Punkt startowy</Form.Label>
					<Form.Select
						ref={waypointStartRef}
						onChange={(e) => {
							setFormData({
								...formData,
								wsId: Number.parseInt(e.currentTarget.value),
							});
						}}
					>
						{waypointsOptions}
					</Form.Select>
				</Form.Group>
				{formData.viaEnabled ? (
					<Form.Group controlId="via">
						<Form.Label>Punkt pośredni</Form.Label>
						<Form.Control
							ref={viaRef}
							type="text"
							placeholder="Wprowadź punkt pośredni"
						/>
					</Form.Group>
				) : null}
				<div>
					<Button
						onClick={() =>
							setFormData({
								...formData,
								viaEnabled: !formData.viaEnabled,
							})
						}
					>
						{formData.viaEnabled
							? "Usuń punkt pośredni"
							: "Dodaj punkt pośredni"}
					</Button>
				</div>
				<Form.Group controlId="waypointEndId">
					<Form.Label>Punkt końcowy</Form.Label>
					<Form.Select
						ref={waypointEndRef}
						onChange={(e) => {
							setFormData({
								...formData,
								weId: Number.parseInt(e.currentTarget.value),
							});
						}}
					>
						{waypointsOptions}
					</Form.Select>
				</Form.Group>
			</Fragment>
		);
	}

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (buttonRef.current) {
			buttonRef.current.disabled = true;
		}
		if (
			waypointStartRef.current &&
			waypointEndRef.current &&
			viaRef.current
		) {
			const body = {
				waypointFromId: Number.parseInt(waypointStartRef.current.value),
				waypointEndId: Number.parseInt(waypointEndRef.current.value),
				via: viaRef.current.value,
				points: 0,
				pointsReverse: 0,
				inPoland: false,
			};
			fetch("http://localhost:3001/admin/segment/create", {
				method: "POST",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
			}).then((res) => {
				if (res.status == 200) {
					//TODO redirect
				}
            else {
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
				{waypointsSelects}
				<Button type="submit" ref={buttonRef}>
					Stwórz nowy odcinek
				</Button>
			</Form>
		</Container>
	);
}
