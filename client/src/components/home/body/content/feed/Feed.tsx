import React from "react";
import { usePostContext } from "../../../../../context/PostContext";
import { PostType } from "../../../../../graphql/generated";
import FeedItem from "./FeedItem";

interface Props {}

const Feed: React.FC<Props> = () => {
  const { posts, getMorePosts } = usePostContext();

  if (!posts) {
    return <p>Loading...</p>;
  }

  return (
    <div className="space-y-4 pt-2">
      {posts?.map((post: PostType) => (
        <FeedItem key={post?.id} post={post as any} />
      ))}
      {
        <button
          type="button"
          className="my-1 mx-auto block text-xs text-indigo-400 underline"
          onClick={getMorePosts}
        >
          Load More Posts
        </button>
      }
    </div>
  );
};

export default Feed;
