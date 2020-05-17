import React from "react";
import { usePostsQuery } from "../../../../../graphql/generated";
import FeedItem from "./FeedItem";

interface Props {}

const Feed: React.FC<Props> = () => {
  const { data, loading, error } = usePostsQuery();

  if (error) {
    console.error(error.message);
    return <h1>Error</h1>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-4 pt-2">
      {data?.posts?.map((post) => (
        <FeedItem key={post?.id} post={post as any} />
      ))}
    </div>
  );
};

export default Feed;
