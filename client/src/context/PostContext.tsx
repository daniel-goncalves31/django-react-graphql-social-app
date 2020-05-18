import React, { useContext, useEffect } from "react";
import {
  OnNewPostDocument,
  PostType,
  usePostsQuery,
} from "../graphql/generated";

interface Context {
  posts: null | PostType[];
}

const PostContext = React.createContext<Context>({
  posts: null,
});

const usePostContext = () => useContext(PostContext);

const PostProvider: React.FC = ({ children }) => {
  const { data, subscribeToMore, fetchMore } = usePostsQuery();

  let posts: any = null;
  if (data?.posts) {
    posts = data.posts;
  }

  useEffect(() => {
    const unsubscribeToLess = subscribeToMore({
      document: OnNewPostDocument,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) {
          return prev;
        }
        return {
          ...prev,
          posts: [(subscriptionData.data as any).onNewPost, ...prev!.posts!],
        };
      },
    });

    return function unsubscribe() {
      if (unsubscribeToLess) {
        unsubscribeToLess();
      }
    };
  }, [subscribeToMore]);

  return (
    <PostContext.Provider value={{ posts }}>{children}</PostContext.Provider>
  );
};

export { usePostContext, PostProvider };
