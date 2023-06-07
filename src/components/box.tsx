import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { JsonAlbumType, JsonPostType } from "../hooks/useJsonApi";

export type BoxPropType = {
  data: JsonAlbumType | JsonPostType;
  boxTitle: string;
  linkTarget: "/albums/" | "/posts/";
};

//TODO neden props.data.body gelmiyor bak!!!!!!!
// export type BoxAlbumType = {
//   data: JsonAlbumType;
//   boxTitle: string;
//   linkTarget: "/albums/" | "/posts/";
// };

// export type BoxPostType = {
//     data: JsonPostType;
//     boxTitle: string;
//     linkTarget: "/albums/" | "/posts/";
//   };

export default function Box(props: BoxPropType) {
  return (
    <Card className=" mb-4 rounded-3 shadow-sm border-primary">
      <Card.Header className="card-header py-3 text-bg-primary border-primary">
        <Card.Title>
          {props.boxTitle} {props.data.id}
        </Card.Title>
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
          {props.data.title}
        </Card.Title>
      </Card.Body>
      <Link
        className="btn btn-primary m-2"
        to={
          "/placeholder/user/" +
          props.data.userId +
          props.linkTarget +
          props.data.id
        }
      >
        Detail
      </Link>
    </Card>
  );
}
