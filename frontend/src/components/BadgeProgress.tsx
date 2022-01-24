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

    const rangeChecker = (value: number) => {
      if(value >= 0 && value < 0.25){
         return "danger"
      }
      if(value >= 0.25 && value < 0.85) {
         return "warning"
      }
      return "success"
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
                    variant={rangeChecker(props.points/props.pointsMax)}
                    now={100 * props.points / props.pointsMax} />
                </div>
                
            </Row>
            <Row className="mt-4">
                <h4>Pasma górskie: {props.mountainRangesCount}/{props.maxRangesCount}</h4>                
                <div>
                    <ProgressBar
                    variant={rangeChecker(props.mountainRangesCount/props.maxRangesCount)}
                    now={Math.min(100 * props.mountainRangesCount / props.maxRangesCount, 100)} />
                </div>
            </Row>
            <Row className="mt-4">
                <h4>Stosunek szlaków po stronie polskiej: {Math.trunc(100 * props.inPolandRatio)}%</h4>                
                <div>
                    <ProgressBar variant={rangeChecker(props.inPolandRatio)} now={100 * props.inPolandRatio}/>
                </div>
            </Row>
            <Row className="mt-4">
                <h5>Aktualny sezon: 01/01/2022 - 31/12/2022</h5>
            </Row>
        </Container>
      </>
  )
}
