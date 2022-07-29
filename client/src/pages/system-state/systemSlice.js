import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSideMenu: false,
  showModal: false,
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    toggleShowSideMenu: (state) => {
      state.showSideMenu = !state.showSideMenu;
    },
    toggleShowModal: (state, { payload }) => {
      state.showModal = payload;
    },
  },
});

const { reducer, actions } = systemSlice;

export const { toggleShowSideMenu, toggleShowModal } = actions;

export default reducer;
