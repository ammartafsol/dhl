import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cms: {},
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  //   reducer needs a map
  reducers: {
    setCMSData: (state, action) => {
      state.cms = action.payload;
    },
  },
});

export const { setCMSData } = commonSlice.actions;

export default commonSlice.reducer;
