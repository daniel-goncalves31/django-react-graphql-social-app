import React from "react";
import FeedItem from "./FeedItem";

interface Props {}

const Feed: React.FC<Props> = () => {
  return (
    <div className="space-y-4">
      <FeedItem />
      <hr />
      <FeedItem />
      <hr />
      <FeedItem />
      <hr />
      <FeedItem />
      <hr />
      <FeedItem />
      <hr />
      <FeedItem />
      <hr />
    </div>
  );
};

export default Feed;
