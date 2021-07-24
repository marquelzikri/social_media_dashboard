import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from './utils/url';

import { User } from '../models/User';

export const usersApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], null>({
      query: () => 'users',
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
