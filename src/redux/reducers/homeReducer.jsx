import { createSlice } from "@reduxjs/toolkit";
import http from "../../utils/configInterceptor";

const initialState = {
  banners: [],
  playLists: [],
};

const homeReducer = createSlice({
  name: "homeReducer",
  initialState,
  reducers: {
    setBannersAction: (state, action) => {
      state.banners = action.payload;
    },

    setPlayListsAction: (state, action) => {
      state.playLists = action.payload;
    }
  },
});

export const { setBannersAction, setPlayListsAction } = homeReducer.actions;

export default homeReducer.reducer;

// async action

export const getBannersActionApi = () => {
  return async (dispatch) => {
    const res = await http.get("/home");
    const action = setBannersAction(res?.data?.data?.items[0].items);
    dispatch(action);
  };
};

export const getPlayListsActionApi = () => {
  return async (dispatch) => {
    const res = await http.get("/home");
    const action = setPlayListsAction(res?.data?.data?.items);
    dispatch(action);
  }
}
