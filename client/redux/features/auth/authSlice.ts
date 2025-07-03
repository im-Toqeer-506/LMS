import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
    userLogedIn: (
      state,
      action: PayloadAction<{ access_token: string; user: string }>
    ) => {
      state.token = action.payload.access_token;
      state.user = action.payload.user;
    },
    userLogout: (state, action) => {
      state.token = "";
      state.user = "";
    },
  },
});

export const { userRegistration, userLogedIn, userLogout } = authSlice.actions;
export default authSlice.reducer;
