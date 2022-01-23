import {
	ChangeEvent,
	Fragment,
	useEffect,
	useState,
   FormEvent,
   useRef
} from "react";
import { Container, Col, Row, Button, Form, Alert } from "react-bootstrap";
import MountainGroup from "../apiEntities/MountainGroup.entity";
import MountainRange from "../apiEntities/MountainRange.entity";
import Waypoint from "../apiEntities/Waypoint.entity";
import { Segment as SegmentEntity } from "../apiEntities/Segment.entity";
import { useNavigate } from "react-router-dom";

interface IPlanState {
	mountainGroups: MountainGroup[];
	mountainRanges: MountainRange[];
	waypoints: Waypoint[];
	segments: SegmentEntity[];
}

interface IPlanFormState {
	startPointId?: number;
	endPointId?: number;
	viaPointsCount: number;
}

type SegmentInput = {
	segmentId: number;
   isReverse: boolean;
};

export default function Plan() {
	const [data, setData] = useState<IPlanState>({
		mountainGroups: [],
		mountainRanges: [],
		waypoints: [],
		segments: [],
	});

	// Hardcoded segment id
	const [formInputs, setFormInputs] = useState<SegmentInput[]>([
		{ segmentId: 1, isReverse: false } as SegmentInput,
	]);
	console.log(formInputs);

	const handleInputChange = (
		e: ChangeEvent<HTMLSelectElement>,
		index: number
	) => {
		e.preventDefault();
		const { name, value } = e.target;
		const list = [...formInputs];
		list[index].segmentId = Number.parseInt(value);
		setFormInputs(list);
	};

	const handleRemoveClick = (index: number) => {
		const list = [...formInputs];
		list.splice(index, 1);
		setFormInputs(list);
	};

	const handleAddClick = () => {
		setFormInputs([...formInputs, { segmentId: 1, isReverse: false } as SegmentInput]);
	};

   const handleReverseToggled = (index: number) => {
      const list = [...formInputs];
      list[index].isReverse = !list[index].isReverse;
      setFormInputs(list);
   };

   const descriptionRef = useRef<HTMLTextAreaElement>(null);
   const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		fetch("http://localhost:3001/admin/segment/create")
			.then((data) => data.json())
			.then((jsonData) => {
				setData(jsonData);
			});
	}, []);

	const segmentsOptions = data.segments.map((s) => (
		<option key={s.id} value={s.id}>
			{s.name}
		</option>
	));

	const segmentsForms = formInputs.map((s, i) => {
		return (
			<Fragment>
               <Row className="mt-3">
                  <Col>
                     <Form.Label>Odcinek {i == 0 ? "początkowy" : i + 1}</Form.Label>
                  </Col>
                  <Col className="col-md-auto">
                     {/* TODO Rozjezdza sie calkowicie ze stanem przy usuwaniu */}
                     <Form.Check
                        type="switch"
                        label="Kierunek przeciwny"
                        value={Number(s.isReverse)}
                        onChange={() => handleReverseToggled(i)}
                     />
                  </Col>
               </Row>
               <Row>
                  <Col>
                     <Form.Select
                        onChange={(e) => handleInputChange(e, i)}
                        value={formInputs[i].segmentId}
                     >
                        {segmentsOptions}
                     </Form.Select>
                  </Col>

                  <Col className="col-md-auto">
                     {formInputs.length !== 1 && (
                        <Button type="button" onClick={() => handleRemoveClick(i)}>
                           Usuń
                        </Button>
                     )}
                  </Col>
               </Row>
            {formInputs.length - 1 === i && (
               <Button className="mt-4" type="button" onClick={handleAddClick}>
                  Dodaj odcinek
               </Button>
            )}
			</Fragment>
		);
	});

   const navigate = useNavigate();

   const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
      if (descriptionRef.current) {
         const body = {
            user_id: 2,
            segments: formInputs.map((s, i) => [{
               id: s.segmentId,
               orderNumber: i,
               reverse: s.isReverse,
               isUserSegment: false
            }]),
            description: descriptionRef.current.value,
         };

         fetch("http://localhost:3001/tourist/tripplan/create", {
				method: "POST",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
			}).then((res) => {
				if (res.status == 200 || res.status == 201) {
					navigate("/tourist/badge");
				}
            else {
               // TODO unlock button and do something
            }
			});
      }
      
	};

	return (
		<Fragment>
			<Container className="mt-4">
            <Row>
				<Col>
					<h2>Planowanie wycieczki</h2>
					<Form onSubmit={onSubmit}>
						{segmentsForms}

                  <Form.Group className="mb-3" controlId="description">
                     <Form.Label>Opis planu wycieczki</Form.Label>
                     <Form.Control
                        ref={descriptionRef}
                        as="textarea"
                        rows={3}
                     />
                  </Form.Group>

						<Button className="float-end" type="submit"  ref={buttonRef}>
                     Utwórz plan wycieczki
                  </Button>
					</Form>
				</Col>

            </Row>
			</Container>
		</Fragment>
	);
}
