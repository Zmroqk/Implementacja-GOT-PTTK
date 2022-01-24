import { Button, Container, Form, FormControl } from "react-bootstrap";
import MountainGroup from "../apiEntities/MountainGroup.entity";
import MountainRange from "../apiEntities/MountainRange.entity";
import Waypoint from "../apiEntities/Waypoint.entity";
import { Segment as SegmentEntity } from "../apiEntities/Segment.entity";
import {
	FormEvent,
	Fragment,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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
   points?: number;
   pointsReverse?: number;
   via?: string
}

export function SegmentForm() {
	const params = useParams();

	const [data, setData] = useState<ISegmentState>({
		mountainGroups: [],
		mountainRanges: [],
		waypoints: [],
		segments: [],
	});
	const [segmentToChange, setSegmentToChange] = useState<
		SegmentEntity | undefined
	>(undefined);

   const [formData, setFormData] = useState<ISegmentFormState>({
		viaEnabled: false,
	} as ISegmentFormState);

	const mountainGroupRef = useCallback(
		(node: HTMLSelectElement) => {
			if (segmentToChange) {
				const mountainGroup = data.mountainGroups.find((mg) =>
					mg.mountainRanges.find(
						(mr) => mr.id === segmentToChange.startPoint.mountainRange.id
					)
				);
				if (node && mountainGroup) {
					node.value = mountainGroup.id.toString();
					node.disabled = true;
				}
			}
		},
		[segmentToChange]
	);
	const mountainRangeRef = useCallback(
		(node: HTMLSelectElement) => {
			if (segmentToChange) {
				const mountainRange = data.mountainRanges.find(
					(mr) => mr.id === segmentToChange.startPoint.mountainRange.id
				);
				if (node && mountainRange) {
					node.value = mountainRange.id.toString();
					node.disabled = true;
				}
			}
		},
		[segmentToChange]
	);
	const waypointStartRef = useCallback(
		(node: HTMLSelectElement) => {
			if (segmentToChange) {
				const startWaypoint = data.waypoints.find(
					(w) => w.id === segmentToChange.startPoint.id
				);
				if (node && startWaypoint) {
					node.value = startWaypoint.id.toString();
					node.disabled = true;
				}
			}
		},
		[segmentToChange]
	);
	const waypointEndRef = useCallback(
		(node: HTMLSelectElement) => {
			if (segmentToChange) {
				const endWaypoint = data.waypoints.find(
					(w) => w.id === segmentToChange.endPoint.id
				);
				if (node && endWaypoint) {
					node.value = endWaypoint.id.toString();
					node.disabled = true;
				}
			}
		},
		[segmentToChange]
	);
	const viaRef = useCallback(
		(node: HTMLInputElement) => {
			if (segmentToChange) {
				if (node && segmentToChange.via !== "") {
					node.value = segmentToChange.via;
					node.disabled = true;
				}
			}
		},
		[segmentToChange]
	);
	const pointsFromRef = useCallback(
		(node: HTMLInputElement) => {
			if (segmentToChange) {
				if (node) {
					node.value = segmentToChange.points.toString();
				}
			}
		},
		[segmentToChange]
	);
	const pointsToRef = useCallback(
		(node: HTMLInputElement) => {
			if (segmentToChange) {
				if (node) {
					node.value = segmentToChange.pointsReverse.toString();
				}
			}
		},
		[segmentToChange]
	);
	const buttonRef = useRef<HTMLButtonElement>(null)
   const viaButtonRef = useCallback((node: HTMLButtonElement) => {
      if(segmentToChange){
         if(node){
            node.style.display = 'None'
         }
      }
   },[segmentToChange]);

	useEffect(() => {
		fetch("http://localhost:3001/admin/segment/create")
			.then((data) => data.json())
			.then((jsonData) => {
				setData(jsonData);
				setFormData({
					...formData,
				} as ISegmentFormState);
			});
	}, []);

	useEffect(() => {
      if(data.mountainGroups.length > 0){
         setFormData({
            ...formData,
            mgId: data.mountainGroups[0].id,
            mrId: data.mountainRanges[0].id
         })
      }
		if (!params.id) {
			return;
		}
		const segmentToModify = data.segments.find(
			(s) => s.id === Number.parseInt(params.id!)
		);
      console.log(segmentToModify)
		setSegmentToChange(segmentToModify);
		if (segmentToModify) {
         const mountainGroup = data.mountainGroups.find((mg) =>
            mg.mountainRanges.find(
               (mr) => mr.id === segmentToModify.startPoint.mountainRange.id
            ))
         setFormData({
            ...formData,
            mgId: mountainGroup!.id,
            mrId: segmentToModify.startPoint.mountainRange.id,
            wsId: segmentToModify.startPoint.id,
            weId: segmentToModify.endPoint.id,
            points: segmentToModify.points,
            pointsReverse: segmentToModify.pointsReverse
         })   
		}
	}, [data]);

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
	let pointsSelect = null;
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
                     onChange={(e) => {
                        setFormData({
                           ...formData,
                           via: e.currentTarget.value
                        })
                     }}
						/>
					</Form.Group>
				) : null}
				<div>
					<Button
                  ref={viaButtonRef}
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
		pointsSelect = (
			<Fragment>
				<label>Punktacja GOT</label>
				<Form.Group controlId="pointsFromId">
					<Form.Label>Punky Z DO</Form.Label>
					<FormControl
						ref={pointsFromRef}
						type="number"
						placeholder="Podaj liczbę punktow"
						defaultValue="0"
                  onChange={(e) => {
                     setFormData({
                        ...formData,
                        points: Number.parseInt(e.currentTarget.value)
                     })
                  }}
					/>
				</Form.Group>
				<Form.Group controlId="pointsToId">
					<Form.Label>Punky DO Z</Form.Label>
					<FormControl
						ref={pointsToRef}
						type="number"
						placeholder="Podaj liczbę punktow"
						defaultValue="0"
                  onChange={(e) => {
                     setFormData({
                        ...formData,
                        pointsReverse: Number.parseInt(e.currentTarget.value)
                     })
                  }}
					/>
				</Form.Group>
			</Fragment>
		);
	}

	const navigate = useNavigate();

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (buttonRef.current) {
			buttonRef.current.disabled = true;
		}
		if (
			formData.wsId &&
			formData.weId &&
			formData.points &&
			formData.pointsReverse
		) {	
         
         if(segmentToChange){
            const segmentId = params.id
            const body = {
               points: formData.points,
               pointsReverse: formData.pointsReverse
            }
            fetch(`http://localhost:3001/admin/segment/${segmentId}`, {
               method: "PATCH",
               body: JSON.stringify(body),
               headers: {
                  "Content-Type": "application/json",
               },
            }).then((res) => {
               if (res.status == 200 || res.status == 201) {
                  navigate("/admin/segment");
               } else {
                  // TODO unlock button and do something
               }
            });
         }
         else{
            const body = {
               waypointFromId: formData.wsId,
               waypointEndId: formData.weId,
               via: formData.via ? formData.via : "",
               points: formData.points,
               pointsReverse: formData.pointsReverse,
               inPoland: false,
            };
            fetch("http://localhost:3001/admin/segment/create", {
               method: "POST",
               body: JSON.stringify(body),
               headers: {
                  "Content-Type": "application/json",
               },
            }).then((res) => {
               if (res.status == 200 || res.status == 201) {
                  navigate("/admin/segment");
               } else {
                  // TODO unlock button and do something
               }
            });
         }			
		}
	};

	return (
		<Container className="mt-4">
			<Link to="/admin/segment">
				<Button className="mb-2">Powrót</Button>
			</Link>
			<Form className="d-grid gap-2" onSubmit={onSubmit}>
				<Form.Group controlId="mountainGroupId">
					<Form.Label>Grupa górska</Form.Label>
					<Form.Select
						ref={mountainGroupRef}
						onChange={(e) => {
                     const mountainGroup = data.mountainGroups.find(mg => mg.id === Number.parseInt(e.currentTarget.value))
                     const mountainRange = mountainGroup?.mountainRanges[0]
							setFormData({
								...formData,
								mgId: Number.parseInt(e.currentTarget.value),
                        mrId: mountainRange ? mountainRange.id : undefined
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
				{pointsSelect}
				<Button type="submit" ref={buttonRef}>
					Zapisz
				</Button>
			</Form>
		</Container>
	);
}
