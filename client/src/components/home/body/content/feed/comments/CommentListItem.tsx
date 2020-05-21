import React from "react";
import { Link } from "react-router-dom";
import { CommentType } from "../../../../../../graphql/generated";
import { getImageUrl } from "../../../../../../utils/getImageUrl";

interface Props {
  comment: CommentType;
}

const CommentListItem: React.FC<Props> = ({ comment }) => {
  const image = getImageUrl(comment.user?.photo, "photo");
  return (
    <div className="flex space-x-2 p-2">
      <img
        src={image}
        alt="user"
        className="h-8 w-8 rounded-full object-cover object-center"
      />
      <div className="p-2 bg-gray-100 rounded-lg text-xs">
        <Link to="/" className="text-xs font-bold text-indigo-600 mr-2">
          {comment.user?.name}
        </Link>
        {comment.text}
      </div>
    </div>
  );
};

export default CommentListItem;
