import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from './utils/url';

import { Comment, Post } from '../models/Post';

export const postsApi = createApi({
  reducerPath: 'posts',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], object>({
      query: () => `posts`,
    }),
    getUserPosts: builder.query<Post[], { userId?: number }>({
      query: ({ userId }) => `posts?userId=${userId}`,
    }),
    getPostById: builder.query<Post, { postId?: number }>({
      query: ({ postId }) => `posts/${postId}`,
    }),
    getPostComments: builder.query<Comment[], { postId?: number }>({
      query: ({ postId }) => `posts/${postId}/comments`,
    }),
    createPost: builder.mutation<Post, Partial<Post> & Pick<Post, 'userId'>>({
      query: ({ id, ...postData }) => ({
        url: `posts`,
        method: 'POST',
        body: postData,
      }),
    }),
    editPost: builder.mutation<Post, Partial<Post> & Pick<Post, 'id' & 'userId'>>({
      query: ({ id, ...postData }) => ({
        url: `posts/${id}`,
        method: 'PUT',
        body: postData,
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetUserPostsQuery,
  useGetPostByIdQuery,
  useGetPostCommentsQuery,
  useCreatePostMutation,
  useEditPostMutation,
} = postsApi;
