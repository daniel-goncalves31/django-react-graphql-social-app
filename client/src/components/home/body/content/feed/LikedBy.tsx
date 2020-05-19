import React from "react";
import { LikeType } from "../../../../../graphql/generated";

interface Props {
  likes: LikeType[];
  currentUserId: string;
}

const LikedBy: React.FC<Props> = ({ likes, currentUserId }) => {
  const getLikes = () => {
    if (!likes.length) {
      return "";
    }

    const likedBy: string[] = [];

    likes.forEach((like) => {
      like.user.id === currentUserId
        ? likedBy.unshift("You")
        : likedBy.push(like.user.name);
    });

    return `Liked by ${likedBy.join(", ")}`;
  };
  return <div className="w-full text-xs text-gray-500">{getLikes()}</div>;
};

export default LikedBy;
