import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   * Create scalar that ignores normal serialization/deserialization, since
   * that will be handled by the multipart request spec
   */
  Upload: any;
  /**
   * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
   */
  GenericScalar: any;
};

export type Query = {
   __typename?: 'Query';
  users?: Maybe<Array<Maybe<UserType>>>;
  posts?: Maybe<Array<Maybe<PostType>>>;
  comments?: Maybe<Array<Maybe<CommentType>>>;
  me?: Maybe<UserType>;
};


export type QueryPostsArgs = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
};


export type QueryCommentsArgs = {
  postId: Scalars['ID'];
};

export type UserType = {
   __typename?: 'UserType';
  id: Scalars['ID'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  /** Designates that this user has all permissions without explicitly assigning them. */
  isSuperuser: Scalars['Boolean'];
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'];
  /** Designates whether the user can log into this admin site. */
  isStaff: Scalars['Boolean'];
  /** Designates whether this user should be treated as active. Unselect this instead of deleting accounts. */
  isActive: Scalars['Boolean'];
  dateJoined: Scalars['DateTime'];
  name: Scalars['String'];
  email: Scalars['String'];
  photo?: Maybe<Scalars['String']>;
  backImage?: Maybe<Scalars['String']>;
};


export type PostType = {
   __typename?: 'PostType';
  id: Scalars['ID'];
  user: UserType;
  text: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  likeSet: Array<LikeType>;
};

export type LikeType = {
   __typename?: 'LikeType';
  id: Scalars['ID'];
  user: UserType;
  post: PostType;
  createdAt: Scalars['DateTime'];
};

export type CommentType = {
   __typename?: 'CommentType';
  id: Scalars['ID'];
  user: UserType;
  post: PostType;
  text: Scalars['String'];
  createdAt: Scalars['DateTime'];
};

export type Mutation = {
   __typename?: 'Mutation';
  signup?: Maybe<SignUp>;
  createPost?: Maybe<CreatePost>;
  likePost?: Maybe<LikePost>;
  dislikePost?: Maybe<DislikePost>;
  createComment?: Maybe<CreateComment>;
  login?: Maybe<ObtainJsonWebToken>;
  verifyToken?: Maybe<Verify>;
  refreshToken?: Maybe<Refresh>;
  logout?: Maybe<DeleteJsonWebTokenCookie>;
};


export type MutationSignupArgs = {
  signupInput: SignUpInputType;
};


export type MutationCreatePostArgs = {
  postInput: PostInputType;
};


export type MutationLikePostArgs = {
  postId: Scalars['ID'];
};


export type MutationDislikePostArgs = {
  likeId: Scalars['ID'];
};


export type MutationCreateCommentArgs = {
  commentInput: CommentInputType;
};


export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationVerifyTokenArgs = {
  token?: Maybe<Scalars['String']>;
};


export type MutationRefreshTokenArgs = {
  token?: Maybe<Scalars['String']>;
};

export type SignUp = {
   __typename?: 'SignUp';
  user?: Maybe<UserType>;
};

export type SignUpInputType = {
  name: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type CreatePost = {
   __typename?: 'CreatePost';
  post?: Maybe<PostType>;
};

export type PostInputType = {
  text: Scalars['String'];
  image?: Maybe<Scalars['Upload']>;
};


export type LikePost = {
   __typename?: 'LikePost';
  like?: Maybe<LikeType>;
};

export type DislikePost = {
   __typename?: 'DislikePost';
  disliked?: Maybe<Scalars['Boolean']>;
};

export type CreateComment = {
   __typename?: 'CreateComment';
  ok?: Maybe<Scalars['Boolean']>;
};

export type CommentInputType = {
  text: Scalars['String'];
  postId: Scalars['ID'];
  usersMarked: Array<Maybe<Scalars['ID']>>;
};

export type ObtainJsonWebToken = {
   __typename?: 'ObtainJSONWebToken';
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  user?: Maybe<UserType>;
  token: Scalars['String'];
};


export type Verify = {
   __typename?: 'Verify';
  payload: Scalars['GenericScalar'];
};

export type Refresh = {
   __typename?: 'Refresh';
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  token: Scalars['String'];
};

export type DeleteJsonWebTokenCookie = {
   __typename?: 'DeleteJSONWebTokenCookie';
  deleted: Scalars['Boolean'];
};

export type Subscription = {
   __typename?: 'Subscription';
  onNewPost?: Maybe<PostType>;
  onNewComment?: Maybe<CommentType>;
};


export type SubscriptionOnNewCommentArgs = {
  postId: Scalars['ID'];
};

export type CreateCommentMutationVariables = {
  commentInput: CommentInputType;
};


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment?: Maybe<(
    { __typename?: 'CreateComment' }
    & Pick<CreateComment, 'ok'>
  )> }
);

export type CreatePostMutationVariables = {
  postInput: PostInputType;
};


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost?: Maybe<(
    { __typename?: 'CreatePost' }
    & { post?: Maybe<(
      { __typename?: 'PostType' }
      & Pick<PostType, 'id' | 'text' | 'image' | 'createdAt'>
      & { user: (
        { __typename?: 'UserType' }
        & Pick<UserType, 'id' | 'name'>
      ) }
    )> }
  )> }
);

export type DislikePostMutationVariables = {
  likeId: Scalars['ID'];
};


export type DislikePostMutation = (
  { __typename?: 'Mutation' }
  & { dislikePost?: Maybe<(
    { __typename?: 'DislikePost' }
    & Pick<DislikePost, 'disliked'>
  )> }
);

export type LikePostMutationVariables = {
  postId: Scalars['ID'];
};


export type LikePostMutation = (
  { __typename?: 'Mutation' }
  & { likePost?: Maybe<(
    { __typename?: 'LikePost' }
    & { like?: Maybe<(
      { __typename?: 'LikeType' }
      & Pick<LikeType, 'id'>
      & { user: (
        { __typename?: 'UserType' }
        & Pick<UserType, 'id' | 'name'>
      ) }
    )> }
  )> }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout?: Maybe<(
    { __typename?: 'DeleteJSONWebTokenCookie' }
    & Pick<DeleteJsonWebTokenCookie, 'deleted'>
  )> }
);

export type LoginMutationVariables = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'ObtainJSONWebToken' }
    & { user?: Maybe<(
      { __typename?: 'UserType' }
      & Pick<UserType, 'id' | 'username' | 'email' | 'name' | 'isSuperuser' | 'lastLogin' | 'photo' | 'isStaff' | 'isActive' | 'dateJoined' | 'backImage'>
    )> }
  )> }
);

export type SignUpMutationVariables = {
  signupInput: SignUpInputType;
};


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signup?: Maybe<(
    { __typename?: 'SignUp' }
    & { user?: Maybe<(
      { __typename?: 'UserType' }
      & Pick<UserType, 'id' | 'username' | 'email' | 'name' | 'isSuperuser' | 'lastLogin' | 'photo' | 'isStaff' | 'isActive' | 'dateJoined' | 'backImage'>
    )> }
  )> }
);

export type CommentsQueryVariables = {
  postId: Scalars['ID'];
};


export type CommentsQuery = (
  { __typename?: 'Query' }
  & { comments?: Maybe<Array<Maybe<(
    { __typename?: 'CommentType' }
    & Pick<CommentType, 'id' | 'text' | 'createdAt'>
    & { user: (
      { __typename?: 'UserType' }
      & Pick<UserType, 'id' | 'name' | 'photo'>
    ) }
  )>>> }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'UserType' }
    & Pick<UserType, 'id' | 'username' | 'email' | 'name' | 'isSuperuser' | 'lastLogin' | 'photo' | 'isStaff' | 'isActive' | 'dateJoined' | 'backImage'>
  )> }
);

export type PostsQueryVariables = {
  offset: Scalars['Int'];
  limit: Scalars['Int'];
};


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts?: Maybe<Array<Maybe<(
    { __typename?: 'PostType' }
    & Pick<PostType, 'id' | 'text' | 'image' | 'createdAt'>
    & { user: (
      { __typename?: 'UserType' }
      & Pick<UserType, 'id' | 'name' | 'photo'>
    ), likeSet: Array<(
      { __typename?: 'LikeType' }
      & Pick<LikeType, 'id'>
      & { user: (
        { __typename?: 'UserType' }
        & Pick<UserType, 'id' | 'name'>
      ) }
    )> }
  )>>> }
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<Array<Maybe<(
    { __typename?: 'UserType' }
    & Pick<UserType, 'id' | 'name' | 'photo'>
  )>>> }
);

export type OnNewCommentSubscriptionVariables = {
  postId: Scalars['ID'];
};


export type OnNewCommentSubscription = (
  { __typename?: 'Subscription' }
  & { onNewComment?: Maybe<(
    { __typename?: 'CommentType' }
    & Pick<CommentType, 'id' | 'text' | 'createdAt'>
    & { user: (
      { __typename?: 'UserType' }
      & Pick<UserType, 'id' | 'name' | 'photo'>
    ) }
  )> }
);

export type OnNewPostSubscriptionVariables = {};


export type OnNewPostSubscription = (
  { __typename?: 'Subscription' }
  & { onNewPost?: Maybe<(
    { __typename?: 'PostType' }
    & Pick<PostType, 'id' | 'text' | 'image' | 'createdAt'>
    & { user: (
      { __typename?: 'UserType' }
      & Pick<UserType, 'id' | 'name' | 'photo'>
    ), likeSet: Array<(
      { __typename?: 'LikeType' }
      & Pick<LikeType, 'id'>
      & { user: (
        { __typename?: 'UserType' }
        & Pick<UserType, 'id' | 'name'>
      ) }
    )> }
  )> }
);


export const CreateCommentDocument = gql`
    mutation CreateComment($commentInput: CommentInputType!) {
  createComment(commentInput: $commentInput) {
    ok
  }
}
    `;
export type CreateCommentMutationFn = ApolloReactCommon.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      commentInput: // value for 'commentInput'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, baseOptions);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = ApolloReactCommon.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($postInput: PostInputType!) {
  createPost(postInput: $postInput) {
    post {
      id
      text
      image
      createdAt
      user {
        id
        name
      }
    }
  }
}
    `;
export type CreatePostMutationFn = ApolloReactCommon.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      postInput: // value for 'postInput'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return ApolloReactHooks.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = ApolloReactCommon.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DislikePostDocument = gql`
    mutation DislikePost($likeId: ID!) {
  dislikePost(likeId: $likeId) {
    disliked
  }
}
    `;
export type DislikePostMutationFn = ApolloReactCommon.MutationFunction<DislikePostMutation, DislikePostMutationVariables>;

/**
 * __useDislikePostMutation__
 *
 * To run a mutation, you first call `useDislikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDislikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dislikePostMutation, { data, loading, error }] = useDislikePostMutation({
 *   variables: {
 *      likeId: // value for 'likeId'
 *   },
 * });
 */
export function useDislikePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DislikePostMutation, DislikePostMutationVariables>) {
        return ApolloReactHooks.useMutation<DislikePostMutation, DislikePostMutationVariables>(DislikePostDocument, baseOptions);
      }
export type DislikePostMutationHookResult = ReturnType<typeof useDislikePostMutation>;
export type DislikePostMutationResult = ApolloReactCommon.MutationResult<DislikePostMutation>;
export type DislikePostMutationOptions = ApolloReactCommon.BaseMutationOptions<DislikePostMutation, DislikePostMutationVariables>;
export const LikePostDocument = gql`
    mutation LikePost($postId: ID!) {
  likePost(postId: $postId) {
    like {
      id
      user {
        id
        name
      }
    }
  }
}
    `;
export type LikePostMutationFn = ApolloReactCommon.MutationFunction<LikePostMutation, LikePostMutationVariables>;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useLikePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LikePostMutation, LikePostMutationVariables>) {
        return ApolloReactHooks.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, baseOptions);
      }
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = ApolloReactCommon.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = ApolloReactCommon.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    deleted
  }
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    user {
      id
      username
      email
      name
      isSuperuser
      lastLogin
      username
      photo
      isStaff
      isActive
      dateJoined
      backImage
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($signupInput: SignUpInputType!) {
  signup(signupInput: $signupInput) {
    user {
      id
      username
      email
      name
      isSuperuser
      lastLogin
      username
      photo
      isStaff
      isActive
      dateJoined
      backImage
    }
  }
}
    `;
export type SignUpMutationFn = ApolloReactCommon.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      signupInput: // value for 'signupInput'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, baseOptions);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = ApolloReactCommon.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = ApolloReactCommon.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const CommentsDocument = gql`
    query Comments($postId: ID!) {
  comments(postId: $postId) {
    id
    user {
      id
      name
      photo
    }
    text
    createdAt
  }
}
    `;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCommentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        return ApolloReactHooks.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, baseOptions);
      }
export function useCommentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, baseOptions);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = ApolloReactCommon.QueryResult<CommentsQuery, CommentsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
    name
    isSuperuser
    lastLogin
    username
    photo
    isStaff
    isActive
    dateJoined
    backImage
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const PostsDocument = gql`
    query Posts($offset: Int!, $limit: Int!) {
  posts(offset: $offset, limit: $limit) {
    id
    text
    image
    createdAt
    user {
      id
      name
      photo
    }
    likeSet {
      id
      user {
        id
        name
      }
    }
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return ApolloReactHooks.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = ApolloReactCommon.QueryResult<PostsQuery, PostsQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    name
    photo
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
export const OnNewCommentDocument = gql`
    subscription onNewComment($postId: ID!) {
  onNewComment(postId: $postId) {
    id
    user {
      id
      name
      photo
    }
    text
    createdAt
  }
}
    `;

/**
 * __useOnNewCommentSubscription__
 *
 * To run a query within a React component, call `useOnNewCommentSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnNewCommentSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnNewCommentSubscription({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useOnNewCommentSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnNewCommentSubscription, OnNewCommentSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<OnNewCommentSubscription, OnNewCommentSubscriptionVariables>(OnNewCommentDocument, baseOptions);
      }
export type OnNewCommentSubscriptionHookResult = ReturnType<typeof useOnNewCommentSubscription>;
export type OnNewCommentSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnNewCommentSubscription>;
export const OnNewPostDocument = gql`
    subscription OnNewPost {
  onNewPost {
    id
    text
    image
    createdAt
    user {
      id
      name
      photo
    }
    likeSet {
      id
      user {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useOnNewPostSubscription__
 *
 * To run a query within a React component, call `useOnNewPostSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnNewPostSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnNewPostSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnNewPostSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnNewPostSubscription, OnNewPostSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<OnNewPostSubscription, OnNewPostSubscriptionVariables>(OnNewPostDocument, baseOptions);
      }
export type OnNewPostSubscriptionHookResult = ReturnType<typeof useOnNewPostSubscription>;
export type OnNewPostSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnNewPostSubscription>;