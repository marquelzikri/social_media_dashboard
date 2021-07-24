import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SidebarState {
  isSidebarOpen: boolean;
}

const initialState: SidebarState = {
  isSidebarOpen: true,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { toggleSidebar } = sidebarSlice.actions;

export const selectSidebar = (state: RootState) => state.sidebar.isSidebarOpen;

export default sidebarSlice.reducer;
