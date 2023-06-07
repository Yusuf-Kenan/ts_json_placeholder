import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useJsonApi, {
  JsonCommetType,
  JsonPostType,
  JsonUserType,
} from "../../hooks/useJsonApi";
import Loader from "../../components/loader/loader";
import UserInfo from "../../components/user-info";
import { Badge, ListGroup } from "react-bootstrap";
import Header from "../../components/header";

export type PostParamType = {
  userID: string | undefined;
  postID: string | undefined;
};

export default function PostDetailPage() {
  const params = useParams<PostParamType>();
  const api = useJsonApi();

  const [user, setUser] = useState<JsonUserType | null>(null);
  const [post, setPost] = useState<JsonPostType | null>(null);
  const [commets, setCommets] = useState<JsonCommetType[] | null>(null);
  const [initState, setInitState] = useState<boolean>(false);

  // (!params.userID || !params.postID) && <div>Something Went Wrong</div>;

  useEffect(() => {
    (async () => {
      const promises = [];
      promises.push(api.getUser(parseInt(params.userID as string)));
      promises.push(api.getPost(parseInt(params.postID as string)));
      promises.push(api.getCommets(parseInt(params.postID as string)));

      const results = await Promise.all(promises);

      setUser(results[0] as JsonUserType);
      setPost(results[1] as JsonPostType);
      setCommets(results[2] as JsonCommetType[]);

      setInitState(true);
    })();
  }, []);

  if (!params.userID || !params.postID) {
    return <>Something Went Wrong</>;
  }

  if (!initState) {
    return <Loader />;
  }

  return (
    <>
      <div className="text-center">
        <em className="h2">{user?.name}:</em>{" "}
        <p className="fs-5">{post?.body} </p>
      </div>
      <hr />
      <ListGroup as="ul">
        {commets !== null &&
          commets.map((commet, index) => {
            return (
              <ListGroup.Item
                key={index}
                as="li"
                className={`d-flex justify-content-between align-items-start ${
                  index % 2 === 0
                    ? "list-group-item-info"
                    : "list-group-item-success"
                }`}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{commet.name}</div>
                  {commet.body}
                </div>
                <Badge bg="warning" pill>
                  {commet.email}
                </Badge>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </>
  );
}
