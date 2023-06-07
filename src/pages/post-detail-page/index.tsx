import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useJsonApi, {
  JsonCommetType,
  JsonPostType,
  JsonUserType,
} from "../../hooks/useJsonApi";
import Loader from "../../components/loader/loader";
import UserInfo from "../../components/user-info";

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
        <small className="fs-3">{post?.id}</small>{" "}
        <p className="fs-5">{post?.body}</p>
      </div>
      <hr />

      <ul className="list-unstyled mt-3 mb-4">
        {commets === null ? <Loader /> : <li></li>}
      </ul>
      <hr />
      <UserInfo user={user as JsonUserType} />
    </>
  );
}
