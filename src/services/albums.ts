import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from './utils/url';

import { Album, Photo } from '../models/Album';

export const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getUserAlbums: builder.query<Album[], { userId?: number }>({
      query: ({ userId }) => `albums?userId=${userId}`,
    }),
    getAlbumById: builder.query<Album, { albumId?: number }>({
      query: ({ albumId }) => `albums/${albumId}`,
    }),
    getAlbumPhotos: builder.query<Photo[], { albumId?: number }>({
      query: ({ albumId }) => `albums/${albumId}/photos`,
    }),
    getPhotoById: builder.query<Photo, { photoId?: number }>({
      query: ({ photoId }) => `photos/${photoId}`,
    }),
  }),
});

export const { useGetUserAlbumsQuery, useGetAlbumPhotosQuery, useGetPhotoByIdQuery, useGetAlbumByIdQuery } = albumsApi;
