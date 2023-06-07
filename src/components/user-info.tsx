import { Col, Row } from "react-bootstrap";
import { JsonUserType } from "../hooks/useJsonApi";

export type UserInfoType = {
  user: JsonUserType;
};
export default function UserInfo({ user }: UserInfoType) {
  return (
    <Row>
      <Col sm="3">
        <strong>Name: </strong> {user?.name}
      </Col>
      <Col sm="3">
        <strong>Name: </strong> {user?.username}
      </Col>
      <Col sm="3">
        <strong>Name: </strong> {user?.website}
      </Col>
      <Col sm="3">
        <strong>Name: </strong> {user?.email}
      </Col>
    </Row>
  );
}
