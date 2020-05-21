import React from "react";
import { UserType } from "../../../../../../graphql/generated";
import { getImageUrl } from "../../../../../../utils/getImageUrl";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

interface Props {
  currentUser: UserType;
  postId: string;
}

const CommentsContainer: React.FC<Props> = ({ currentUser, postId }) => {
  const image = getImageUrl(currentUser.photo, "photo");

  return (
    <div>
      <div className="flex space-x-1">
        <img
          src={image}
          alt="user"
          className="h-10 w-10 mb-2 rounded-full object-cover object-center"
        />
        <CommentInput postId={postId} />
      </div>
      <CommentList postId={postId} />
    </div>
  );
};

export default CommentsContainer;
