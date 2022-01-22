import React from 'react';
import { Row, Container, ProgressBar } from 'react-bootstrap';

interface IBadgeProgressProps {
	userId?: number;
}


export default function BadgeProgress({ userId }: IBadgeProgressProps) {
  return (
      <>
        <Container className="py-4 bg-light text-center">
            <Row>
                <div>
                    <img src="https://via.placeholder.com/150" alt="odznaka-img"></img>
                </div>
            </Row>
            <Row className="mt-4">
                <h4>Aktualnie zdobywana odznaka:</h4>
                <h4>GOT mała srebrna</h4>
            </Row>
            <Row className="mt-4">
                <h4>Punkty GOT: 214/360</h4>
                <div>
                    <ProgressBar variant="warning" now={82}/>
                </div>
                
            </Row>
            <Row className="mt-4">
                <h4>Pasma górskie: 2/2</h4>                
                <div>
                    <ProgressBar variant="success" now={100}/>
                </div>
            </Row>
            <Row className="mt-4">
                <h4>Stosunek szlaków po stronie polskiej: 79%</h4>                
                <div>
                    <ProgressBar variant="success" now={79}/>
                </div>
            </Row>
            <Row className="mt-4">
                <h5>Aktualny sezon: 01/01/2022 - 31/12/2022</h5>
            </Row>
            
            
            
        </Container>
      </>
  )
}
