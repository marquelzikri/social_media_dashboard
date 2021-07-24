import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import sidebarSlice from '../features/sidebar/sidebarSlice';

import { albumsApi } from '../services/albums';
import { postsApi } from '../services/posts';
import { usersApi } from '../services/users';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    sidebar: sidebarSlice,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(postsApi.middleware)
      .concat(usersApi.middleware)
  ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
