import React, { useContext, useEffect } from "react";
import {
  OnNewPostDocument,
  PostsDocument,
  PostType,
  usePostsQuery,
} from "../graphql/generated";

interface Context {
  posts: PostType[];
  postsCount: number;
  getMorePosts: () => void;
}

const PostContext = React.createContext<Context>({
  posts: [],
  postsCount: 0,
  getMorePosts: () => {},
});

const usePostContext = () => useContext(PostContext);

const PostProvider: React.FC = ({ children }) => {
  const { data, subscribeToMore, fetchMore } = usePostsQuery({
    variables: { offset: 0, limit: 5 },
  });

  let posts: any = [];
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
    <PostContext.Provider
      value={{ posts, getMorePosts, postsCount: posts.length }}
    >
      {children}
    </PostContext.Provider>
  );
};

export { usePostContext, PostProvider };
