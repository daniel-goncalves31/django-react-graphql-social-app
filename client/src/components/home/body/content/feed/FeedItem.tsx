import React from "react";
import { FiThumbsUp } from "react-icons/fi";
import { GoCommentDiscussion } from "react-icons/go";
import { PostType } from "../../../../../graphql/generated";
import { getImageUrl } from "../../../../../utils/getImageUrl";

interface Props {
  post: PostType;
}

const FeedItem: React.FC<Props> = ({ post }) => {
  const userPhoto = getImageUrl(post.user.photo, "photo");
  const postImage = post.image ? getImageUrl(post.image, "photo") : null;

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
      <div className="flex justify-end p-2 space-x-6">
        <button
          type="button"
          className="flex items-center outline-none bg-transparent text-indigo-400 text-xs hover:text-indigo-600"
          style={{ lineHeight: "1px" }}
        >
          <FiThumbsUp className="mr-1" />
          Like
        </button>
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
