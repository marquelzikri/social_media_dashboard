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
    deletePost: builder.mutation<Post, Pick<Post, 'id'>>({
      query: ({ id }) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
    }),
    createComment: builder.mutation<Comment, Partial<Comment> & Pick<Comment, 'postId'>>({
      query: ({ postId, ...postData }) => ({
        url: `posts/${postId}/comments`,
        method: 'POST',
        body: postData,
      }),
    }),
    editComment: builder.mutation<Comment, Partial<Comment>>({
      query: ({ id, ...postData }) => ({
        url: `/comments/${id}`,
        method: 'PUT',
        body: postData,
      }),
    }),
    deleteComment: builder.mutation<Comment, Partial<Comment>>({
      query: ({ id }) => ({
        url: `/comments/${id}`,
        method: 'DELETE',
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
  useDeletePostMutation,
  useCreateCommentMutation,
  useEditCommentMutation,
  useDeleteCommentMutation,
} = postsApi;
