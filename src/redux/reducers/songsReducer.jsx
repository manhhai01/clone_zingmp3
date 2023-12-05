import { createSlice } from "@reduxjs/toolkit";
import http from "../../utils/configInterceptor";

const initialState = {
  songCurrentDetail: {},
  sourceSongCurrent: "",
};

const songsReducer = createSlice({
  name: "songsReducer",
  initialState,
  reducers: {
    setSongCurrentDetailAction: (state, action) => {
      state.songCurrentDetail = action.payload;
    },
    setSourceSongCurrentAction: (state, action) => {
      state.sourceSongCurrent = action.payload;
    },
  },
});

export const { setSongCurrentDetailAction, setSourceSongCurrentAction } =
  songsReducer.actions;

export default songsReducer.reducer;

// async action

export const getSongCurrentDetailActionApi = (sid) => {
  return async (dispatch) => {
    const res = await http.get(`/infosong?id=${sid}`);

    if (res) {
      const actionDispatch = setSongCurrentDetailAction(res?.data?.data);
      dispatch(actionDispatch);
    }
  };
};

export const getSourceSongCurrentActionApi = (sid) => {
  return async (dispatch) => {
    const res = await http.get(`/song?id=${sid}`);

    if (res) {
      const actionDispatch = setSourceSongCurrentAction(res?.data?.data?.["128"]);
      dispatch(actionDispatch);
    }
  };
};
