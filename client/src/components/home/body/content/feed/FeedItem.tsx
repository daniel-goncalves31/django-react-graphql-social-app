import React, { useEffect, useState } from "react";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { GoCommentDiscussion } from "react-icons/go";
import { useUserContext } from "../../../../../context/UserContext";
import {
  LikeType,
  PostType,
  useLikePostMutation,
} from "../../../../../graphql/generated";
import { handleErrors } from "../../../../../utils/error_handler";
import { getImageUrl } from "../../../../../utils/getImageUrl";
import Likes from "./Likes";

interface Props {
  post: PostType;
}

const FeedItem: React.FC<Props> = ({ post }) => {
  const { currentUser } = useUserContext();
  const [likePost] = useLikePostMutation();

  const [likes, setLikes] = useState<LikeType[]>([]);

  const userPhoto = getImageUrl(post.user.photo, "photo");
  const postImage = post.image ? getImageUrl(post.image, "photo") : null;

  useEffect(() => {
    setLikes([...post.likeSet]);
  }, [post]);

  const handleLikePost = async () => {
    try {
      const { data } = await likePost({ variables: { postId: post.id } });
      if (data?.likePost?.like) {
        setLikes((prevLikes) => [...prevLikes, data?.likePost?.like as any]);
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const alreadyLiked = likes.find((like) => like.user.id === currentUser?.id);

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
      <Likes likes={likes} currentUserId={currentUser?.id!} />
      <div className="flex justify-end p-2 space-x-6">
        {alreadyLiked ? (
          <button
            type="button"
            className="flex items-center outline-none bg-transparent text-red-400 text-xs hover:text-red-600"
            style={{ lineHeight: "1px" }}
            onClick={handleLikePost}
          >
            <FiThumbsDown className="mr-1" />
            Dislike
          </button>
        ) : (
          <button
            type="button"
            className="flex items-center outline-none bg-transparent text-indigo-400 text-xs hover:text-indigo-600"
            style={{ lineHeight: "1px" }}
            onClick={handleLikePost}
          >
            <FiThumbsUp className="mr-1" />
            Like
          </button>
        )}
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

export default React.memo(FeedItem);
