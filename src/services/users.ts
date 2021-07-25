import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from './utils/url';

import { User } from '../models/User';

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getUser: builder.query<User, { userId?: number }>({
      query: ({ userId }) => `users/${userId}`,
    }),
    getUsers: builder.query<User[], object>({
      query: () => `users`,
    }),
  }),
});

export const { useGetUserQuery, useGetUsersQuery } = usersApi;
