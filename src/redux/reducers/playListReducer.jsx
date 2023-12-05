import { createSlice } from "@reduxjs/toolkit";
import http from "../../utils/configInterceptor";

const initialState = {
  playList: [],
};

const playListReducer = createSlice({
  name: "playListReducer",
  initialState,
  reducers: {
    setPlayListAction: (state, action) => {
      state.playList = action.payload;
    },
  },
});

export const { setPlayListAction } = playListReducer.actions;

export default playListReducer.reducer;

// async action

export const getPlayListActionApi = (plid) => {
  return async (dispatch) => {
    const res = await http.get(`/detailplaylist?id=${plid}`);

    if (res) {
      const actionDispatch = setPlayListAction(res?.data?.data);
      dispatch(actionDispatch);
    }
  };
};
