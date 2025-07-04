import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  refreshToken: "",
  isLogin: false,
  user: null,
  fcmToken: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  //   reducer needs a map
  reducers: {
    saveFcmToken(state, action) {
      state.fcmToken = action.payload.fcmToken;
    },
    saveLoginUserData(state, action) {
      state.user = action.payload?.user;
      state.isLogin = true;
      state.accessToken = action.payload?.token;
      state.refreshToken = action?.payload?.refreshToken;
    },
    updateAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    updateUserData(state, action) {
      console.log("🚀 ~ updateUserData ~ state:", state?.user, action.payload);
      state.user = action.payload;
    },
    signOutRequest(state) {
      state.accessToken = "";
      state.refreshToken = "";
      state.isLogin = false;
      state.user = null;
    },
    updateJWTTokens(state, action) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
});

export const {
  saveFcmToken,
  saveLoginUserData,
  signOutRequest,
  updateUserData,
  updateJWTTokens,
  updateAccessToken,
} = authSlice.actions;

export default authSlice.reducer;
