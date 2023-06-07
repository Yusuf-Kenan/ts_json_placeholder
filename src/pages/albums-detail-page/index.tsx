import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useJsonApi, {
  JsonAlbumType,
  JsonPhotoType,
  JsonUserType,
} from "../../hooks/useJsonApi";
import Loader from "../../components/loader/loader";
import UserInfo from "../../components/user-info";
import { Carousel, Col, Row } from "react-bootstrap";

/*

Could not find a declaration file for module '@splidejs/react-splide'. '/Users/naam/Desktop/front-end/ts_placeholder/node_modules/@splidejs/react-splide/dist/js/react-splide.esm.js' implicitly has an 'any' type.
  There are types at '/Users/naam/Desktop/front-end/ts_placeholder/node_modules/@splidejs/react-splide/dist/types/index.d.ts', but this result could not be resolved when respecting package.json "exports". The '@splidejs/react-splide' library may need to update its package.json or typings.


*/
export type AlbumParamsType = {
  userID: string | undefined;
  albumID: string | undefined;
};
export default function AlbumsDetailPage() {
  const params = useParams<AlbumParamsType>();
  const api = useJsonApi();

  const [initState, setInitState] = useState<boolean>(false);
  const [photos, setPhotos] = useState<JsonPhotoType[] | null>(null);
  const [user, setUser] = useState<JsonUserType | null>(null);
  const [album, setAlbum] = useState<JsonAlbumType | null>(null);

  //useEffectten once kullaninca sorun cikardi....!!!!!
  // if (!params.userID || !params.albumID) {
  //   return <h1>Something Went Wrong</h1>;
  // }

  useEffect(() => {
    (async () => {
      const promises = [];
      promises.push(api.getUser(parseInt(params.userID as string)));
      promises.push(api.getAlbum(parseInt(params.albumID as string)));
      promises.push(api.getPhotos(parseInt(params.albumID as string)));

      const results = await Promise.all(promises);

      setUser(results[0] as JsonUserType);
      setAlbum(results[1] as JsonAlbumType);
      setPhotos(results[2] as JsonPhotoType[]);

      setInitState(true);
    })();
  }, []);

  if (!params.userID || !params.albumID) {
    return <h1>Something Went Wrong</h1>;
  }

  if (!initState) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="text-center">
        <em className="text-info">{album?.title}</em> <small>of</small>{" "}
        {user?.username}
      </h1>
      <hr />
      <Row>
        <Col className="my-3" sm="12">
          <Carousel>
            {photos?.map((photo: JsonPhotoType, index) => {
              return (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={photo.url}
                    alt={photo.title}
                  />
                  <Carousel.Caption>
                    <h3>{photo.title}</h3>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
      </Row>
      <hr />
      <UserInfo user={user as JsonUserType} />
    </>
  );
}
