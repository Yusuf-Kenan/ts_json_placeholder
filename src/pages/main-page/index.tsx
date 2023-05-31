import { Button, Col, Row } from "react-bootstrap";
import { useState } from "react";

export default function MainPage() {
  const [counter, setCounter] = useState<number>(0);
  return (
    <>
      <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
        <h1 className="display-4 fw-normal">Home Home Sweet Home</h1>
      </div>
      <Row>
        <Col sm="4">
          <Button
            onClick={() => setCounter(counter - 1)}
            variant="primary"
            className="w-100"
          >
            -
          </Button>
        </Col>
        <Col sm="4" className="text-center">
          <h1> {counter}</h1>
        </Col>
        <Col sm="4">
          <Button
            onClick={() => setCounter(counter + 1)}
            variant="primary"
            className="w-100"
          >
            +
          </Button>
        </Col>
      </Row>
    </>
  );
}
