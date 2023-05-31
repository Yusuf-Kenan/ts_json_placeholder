import { useEffect, useState } from "react";
import useJsonApi, {
  JsonPlaceholderApi,
  JsonUserType,
} from "../../hooks/useJsonApi";
import { AxiosResponse } from "axios";
import { Card, Col, Row } from "react-bootstrap";

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
          <div>Loading...</div>
        ) : (
          users.map((item, index) => {
            return (
              <Col key={index} sm="4">
                <Card className=" mb-4 rounded-3 shadow-sm border-primary">
                  <Card.Header className="card-header py-3 text-bg-primary border-primary">
                    <h3>{item.username}</h3>
                  </Card.Header>
                  <Card.Body>
                    <h1 className="title">{item.name}</h1>
                    <ul className="list-unstyled mt-3 mb-4">
                      <li>{item.phone}</li>
                      <li>{item.email}</li>
                      <li>{item.address.city}</li>
                      <li>{item.company.name}</li>
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        )}
      </Row>
    </>
  );
}
