import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from './utils/url';

import { Comment, Post } from '../models/Post';

export const postsApi = createApi({
  reducerPath: 'posts',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getUserPosts: builder.query<Post[], { userId?: number }>({
      query: ({ userId }) => `posts?userId=${userId}`,
    }),
    getPostById: builder.query<Post, { postId?: number }>({
      query: ({ postId }) => `posts/${postId}`,
    }),
    getPostComments: builder.query<Comment[], { postId?: number }>({
      query: ({ postId }) => `posts/${postId}/comments`,
    }),
  }),
});

export const { useGetUserPostsQuery, useGetPostByIdQuery, useGetPostCommentsQuery } = postsApi;
