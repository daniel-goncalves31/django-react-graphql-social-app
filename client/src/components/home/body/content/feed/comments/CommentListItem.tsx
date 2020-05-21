import React from "react";
import * as processString from "react-process-string";
import { Link } from "react-router-dom";
import { useAllUsersContext } from "../../../../../../context/AllUsersContext";
import { CommentType } from "../../../../../../graphql/generated";
import { getImageUrl } from "../../../../../../utils/getImageUrl";

interface Props {
  comment: CommentType;
}

const CommentListItem: React.FC<Props> = ({ comment }) => {
  const image = getImageUrl(comment.user?.photo, "photo");
  const { allUsers } = useAllUsersContext();

  const getComment = () =>
    processString([
      {
        regex: /@([a-z0-9_-]+?)( |,|$|\.)/gim, //regex to match a username
        fn: (key: string, result: string[]) => {
          let username = result[1];
          let foundUsers = allUsers?.filter(
            (user) => user.username === username
          );

          if (!foundUsers?.length) return result[0]; //@username

          return (
            <Link key={key} to="/" className="text-indigo-500 font-bold">
              @{username + " "}
            </Link>
          );
        },
      },
    ]);

  return (
    <div className="flex space-x-2 p-2">
      <img
        src={image}
        alt="user"
        className="h-8 w-8 rounded-full object-cover object-center"
      />
      <div className="p-2 bg-gray-100 rounded-lg text-xs">
        <Link to="/" className="text-xs font-bold text-indigo-600 mr-2">
          {comment.user?.name}:
        </Link>
        {getComment()(comment.text)}
      </div>
    </div>
  );
};

export default CommentListItem;
