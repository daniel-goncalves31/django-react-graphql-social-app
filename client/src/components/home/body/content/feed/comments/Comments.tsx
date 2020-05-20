import React from "react";
import { UserType } from "../../../../../../graphql/generated";
import { getImageUrl } from "../../../../../../utils/getImageUrl";
import CommentInput from "./CommentInput";

interface Props {
  currentUser: UserType;
  postId: string;
}

const Comments: React.FC<Props> = ({ currentUser, postId }) => {
  const image = getImageUrl(currentUser.photo, "photo");

  return (
    <div className="form-comment flex space-x-1">
      <img
        src={image}
        alt="user"
        className="h-10 w-10 rounded-full object-cover object-center"
      />
      <CommentInput postId={postId} />
    </div>
  );
};

export default Comments;
