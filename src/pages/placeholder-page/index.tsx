/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useJsonApi, {
  JsonPlaceholderApi,
  JsonUserType,
} from "../../hooks/useJsonApi";
import { AxiosResponse } from "axios";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/loader";

export default function PlaceHolderPage() {
  const api: JsonPlaceholderApi = useJsonApi();
  const [users, setUsers] = useState<JsonUserType[] | null>(null);

  useEffect(() => {
    (async () => {
      const result: AxiosResponse<JsonUserType[]> = await api.users();

      setUsers(result.data);
    })();
  }, []);

  return (
    <>
      <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
        <h1 className="display-4 fw-normal">USERS</h1>
        <hr />
      </div>
      <Row>
        {users === null ? (
          <Loader />
        ) : (
          users.map((user, index) => {
            return (
              <Col key={index} sm="4">
                <Card className=" mb-4 rounded-3 shadow-sm border-primary">
                  <Card.Header className="card-header py-3 text-bg-primary border-primary">
                    <Card.Title>{user.username}</Card.Title>
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
                      {user.name}
                    </Card.Title>
                    <ul className="list-unstyled mt-3 mb-4">
                      <li>
                        <strong>Phone:</strong> {user.phone}
                      </li>
                      <li>
                        <strong>email:</strong> {user.email}
                      </li>
                      <li>
                        <strong>web:</strong> {user.website}
                      </li>
                      <li>
                        <strong>City:</strong> {user.address.city}
                      </li>
                      <li>
                        <strong>Company:</strong> {user.company.name}
                      </li>
                    </ul>
                  </Card.Body>
                  <Link
                    className="btn btn-primary m-2"
                    to={"/placeholder/user/" + user.id}
                  >
                    Detail
                  </Link>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
    </>
  );
}
