import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songCurrent: {},
};

const featureReducer = createSlice({
  name: "featureReducer",
  initialState,
  reducers: {
    setSongCurrentAction: (state, action) => {
      state.songCurrent = action.payload;
    },
  },
});

export const { setSongCurrentAction } = featureReducer.actions;

export default featureReducer.reducer;
