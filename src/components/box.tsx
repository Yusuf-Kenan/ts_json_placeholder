import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Box() {
  return (
    <Card className=" mb-4 rounded-3 shadow-sm border-primary">
      <Card.Header className="card-header py-3 text-bg-primary border-primary">
        <Card.Title>Example Title</Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Title
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          className="title"
        >
          Example Title
        </Card.Title>
        <ul className="list-unstyled mt-3 mb-4">
          <li>
            <strong>Phone:</strong> Example li
          </li>
          <li>
            <strong>email:</strong> Example li
          </li>
          <li>
            <strong>web:</strong> Example li
          </li>
          <li>
            <strong>City:</strong> Example li
          </li>
          <li>
            <strong>Company:</strong> Example li
          </li>
        </ul>
      </Card.Body>
      <Link className="btn btn-primary m-2" to={"/placeholder/user/"}>
        Detail
      </Link>
    </Card>
  );
}
