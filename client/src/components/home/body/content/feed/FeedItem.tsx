import React, { useEffect, useState } from "react";
import { GoCommentDiscussion } from "react-icons/go";
import { useUserContext } from "../../../../../context/UserContext";
import { LikeType, PostType } from "../../../../../graphql/generated";
import { getImageUrl } from "../../../../../utils/getImageUrl";
import LikeButtons from "./LikeButtons";
import LikedBy from "./LikedBy";

interface Props {
  post: PostType;
}

const FeedItem: React.FC<Props> = ({ post }) => {
  const { currentUser } = useUserContext();

  const [likes, setLikes] = useState<LikeType[]>([]);

  const userPhoto = getImageUrl(post.user.photo, "photo");
  const postImage = post.image ? getImageUrl(post.image, "photo") : null;

  useEffect(() => {
    setLikes([...post.likeSet]);
  }, [post]);

  return (
    <div className="space-y-2">
      <div className="flex">
        <img
          className="w-16 h-16 rounded-full object-cover object-center block"
          src={userPhoto}
          alt="user"
        />
        <div className="ml-2">
          <h1 className="text-gray-900 font-bold tracking-wide">
            {post.user.name}
          </h1>
          <p className="text-xs italic">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-600">{post.text}</p>
      {postImage && (
        <img
          className="w-full object-cover object-center rounded"
          src={postImage}
          alt="post"
          style={{ maxHeight: "20rem" }}
        />
      )}
      <LikedBy likes={likes} currentUserId={currentUser?.id!} />
      <div className="flex justify-end p-2 space-x-6">
        <LikeButtons
          likes={likes}
          setLikes={setLikes}
          currentUserId={currentUser?.id!}
          postId={post.id}
        />
        <button
          type="button"
          className="flex items-center outline-none bg-transparent text-gray-600 text-xs hover:text-gray-800"
          style={{ lineHeight: "1px" }}
        >
          <GoCommentDiscussion className="mr-1" />
          Comment
        </button>
      </div>
      <hr />
    </div>
  );
};

export default FeedItem;
