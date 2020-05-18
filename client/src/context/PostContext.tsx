import React, { useContext, useEffect } from "react";
import {
  OnNewPostDocument,
  PostsDocument,
  PostType,
  usePostsQuery,
} from "../graphql/generated";

interface Context {
  posts: null | PostType[];
  getMorePosts: () => void;
}

const PostContext = React.createContext<Context>({
  posts: null,
  getMorePosts: () => {},
});

const usePostContext = () => useContext(PostContext);

const PostProvider: React.FC = ({ children }) => {
  const { data, subscribeToMore, fetchMore } = usePostsQuery({
    variables: { offset: 0, limit: 5 },
  });

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

  const getMorePosts = () => {
    fetchMore({
      query: PostsDocument,
      variables: { offset: data?.posts?.length, limit: 5 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          posts: [...(prev as any).posts, ...(fetchMoreResult as any).posts],
        };
      },
    });
  };

  return (
    <PostContext.Provider value={{ posts, getMorePosts }}>
      {children}
    </PostContext.Provider>
  );
};

export { usePostContext, PostProvider };
