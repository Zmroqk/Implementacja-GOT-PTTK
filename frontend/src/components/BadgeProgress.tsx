import React from 'react';
import { Row, Container, ProgressBar } from 'react-bootstrap';

interface IBadgeProgressProps {
    badgeName: string;
    badgeLevel: string;
	points: number;
    pointsMax: number;
    inPolandRatio: number;
    mountainRangesCount: number;
    maxRangesCount: number;
}

export default function BadgeProgress(props: IBadgeProgressProps) {

    let badgeImgPath = "https://via.placeholder.com/150"

    if (props.badgeLevel == "Brązowa") {
        badgeImgPath = "/mala_braz.png";
    } else if (props.badgeLevel == "Srebrna") {
        badgeImgPath = "/mala_srebr.png";
    } else if (props.badgeLevel == "Złota") {
        badgeImgPath = "/mala_zlota.png";
    }

  return (
      <>
        <Container className="py-4 bg-light text-center">
            <Row>
                <div>
                <img src={badgeImgPath} alt="tourist-img"></img>
                </div>
            </Row>
            <Row className="mt-4">
                <h4>Aktualnie zdobywana odznaka:</h4>
                <h4>GOT {props.badgeName} {props.badgeLevel}</h4>
            </Row>
            <Row className="mt-4">
                <h4>Punkty GOT: {props.points}/{props.pointsMax}</h4>
                <div>
                    <ProgressBar 
                    variant={props.points >= props.pointsMax ? "success" : "warning"}
                    now={100 * props.points / props.pointsMax} />
                </div>
                
            </Row>
            <Row className="mt-4">
                <h4>Pasma górskie: {props.mountainRangesCount}/{props.maxRangesCount}</h4>                
                <div>
                    <ProgressBar
                    variant={props.mountainRangesCount >= props.maxRangesCount ? "success" : "warning"}
                    now={Math.min(100 * props.mountainRangesCount / props.maxRangesCount, 100)} />
                </div>
            </Row>
            <Row className="mt-4">
                <h4>Stosunek szlaków po stronie polskiej: {Math.trunc(100 * props.inPolandRatio)}%</h4>                
                <div>
                    <ProgressBar variant={props.inPolandRatio > 50.0 ? "success" : "warning"} now={100 * props.inPolandRatio}/>
                </div>
            </Row>
            <Row className="mt-4">
                <h5>Aktualny sezon: 01/01/2022 - 31/12/2022</h5>
            </Row>
        </Container>
      </>
  )
}
