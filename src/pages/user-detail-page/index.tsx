/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import useJsonApi, {
  JsonAlbumType,
  JsonPostType,
  JsonUserType,
} from "../../hooks/useJsonApi";

import { Col, Row } from "react-bootstrap";

import Loader from "../../components/loader/loader";
import Box from "../../components/box";

export type UserDetailParamType = {
  userId: string | undefined;
};
export default function UserDetailPage() {
  const [initState, setInitState] = useState<boolean>(false);
  const [user, setUser] = useState<JsonUserType | null>(null);
  const [albums, setAlbums] = useState<JsonAlbumType[] | null>(null);
  const [posts, setPosts] = useState<JsonPostType[] | null>(null);
  const api = useJsonApi();
  const params: Readonly<Partial<UserDetailParamType>> =
    useParams<UserDetailParamType>();

  useEffect(() => {
    (async () => {
      if (params.userId) {
        const promises = [];
        promises.push(api.getUser(parseInt(params.userId)));
        promises.push(api.getAlbums(parseInt(params.userId)));
        promises.push(api.getPosts(parseInt(params.userId)));

        const results = await Promise.all(promises);

        setUser(results[0] as JsonUserType);
        setAlbums(results[1] as JsonAlbumType[]);
        setPosts(results[2] as JsonPostType[]);
        setInitState(true);

        //BU YONTEM UZUN SURER ONDAN YUKARIDAKI GIBI PROMISE.ALL ILE TEK SEFERDE ISTEK ATMAK DAHA DOGRU:
        // const userDetail = await api.getUser(parseInt(params.userId));
        // const albums = await api.getAlbums(parseInt(params.userId));
        // const posts = await api.getPosts(parseInt(params.userId));
      }
    })();
  }, []);
  if (!initState) {
    return <Loader />;
  }
  return (
    <>
      <h1 className="text-center">{user?.name}</h1>
      <Row>
        <Col sm="4">
          <ul className="list-unstyled mt-3 mb-4">
            <li>
              <strong>Username:</strong> {user?.username}
            </li>
            <li>
              <strong>web:</strong> {user?.website}
            </li>
            <li>
              <strong>email:</strong> {user?.email}
            </li>
            <li>
              <strong>Phone:</strong> {user?.phone}
            </li>
          </ul>
        </Col>
        <Col sm="4">
          <ul className="list-unstyled mt-3 mb-4">
            <li>
              <strong>Company:</strong> {user?.company.name}
            </li>
            <li>
              <strong>Phrase:</strong> {user?.company.catchPhrase}
            </li>
            <li>
              <strong>BS:</strong> {user?.company.bs}
            </li>
            <li>
              <strong>City:</strong> {user?.address.city}
            </li>
          </ul>
        </Col>
        <Col sm="4">
          <ul className="list-unstyled mt-3 mb-4">
            <li>
              <strong>City:</strong> {user?.address.city}
            </li>
            <li>
              <strong>Street:</strong> {user?.address.street}
            </li>
            <li>
              <strong>Suite:</strong> {user?.address.suite}
            </li>
            <li>
              <strong>ZIP:</strong> {user?.address.zipcode}
            </li>
          </ul>
        </Col>
      </Row>

      <hr />
      <h2 className="text-center mt-5 mb-3">
        <span className="h4">Albums of </span>{" "}
        <em className="text-success">{user?.name}</em>
      </h2>
      <Row>
        {albums?.map((album: JsonAlbumType, index) => {
          return (
            <Col key={index} sm={"3"}>
              <Box data={album} boxTitle="Album" linkTarget="/albums/" />
            </Col>
          );
        })}
      </Row>

      <hr />
      <h2 className="text-center mt-5 mb-3">
        <span className="h4">Posts of</span>{" "}
        <em className="text-warning">{user?.name}</em>
      </h2>
      <Row>
        {posts?.map((post: JsonPostType, index) => {
          return (
            <Col key={index} sm={"3"}>
              <Box data={post} boxTitle="Post" linkTarget="/posts/" />
            </Col>
          );
        })}
      </Row>
    </>
  );
}
