import React from "react";
import { usePostContext } from "../../../../../context/PostContext";
import { PostType } from "../../../../../graphql/generated";
import FeedItem from "./FeedItem";

interface Props {}

const Feed: React.FC<Props> = () => {
  const { posts } = usePostContext();

  if (!posts) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-4 pt-2">
      {posts?.map((post: PostType) => (
        <FeedItem key={post?.id} post={post as any} />
      ))}
    </div>
  );
};

export default Feed;
