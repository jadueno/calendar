import { createSlice } from "@reduxjs/toolkit";

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
};

const tempUser: User = {
  _id: "123",
  name: "Juan",
  email: "jadueno.dev@gmail.com",
  password: "123",
};

export const userSlice = createSlice({
  name: "calendar",
  initialState: {
    activeUser: null,
    userList: [tempUser],
  },
  reducers: {
    onSetActiveUser: (state, { payload }) => {
      state.activeUser = payload;
    },
    onDeleteActiveUser: (state) => {
      state.activeUser = null;
    },
    onAddNewUser: (state, { payload }) => {
      state.userList.push(payload);
      state.activeUser = payload;
    },
  },
});

export const { onSetActiveUser, onAddNewUser, onDeleteActiveUser } =
  userSlice.actions;
