import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPlaying: false,
  isAlbumNext: false,
  isAlbumPrev: false,
  isSuffle: false,
  isRepeat: false,
  isVolume: true,
  valueVolume: 70,
};

const statusReducer = createSlice({
  name: "statusReducer",
  initialState,
  reducers: {
    setIsPlayingAction: (state, action) => {
      state.isPlaying = action.payload;
    },
    setIsAlbumNextAction: (state, action) => {
      state.isAlbumNext = action.payload;
    },

    setIsAlbumPrevAction: (state, action) => {
      state.isAlbumPrev = action.payload;
    },

    setIsSuffleAction: (state, action) => {
      state.isSuffle = action.payload;
    },

    setIsRepeatAction: (state, action) => {
      state.isRepeat = action.payload;
    },

    setIsVolumeAction: (state, action) => {
      state.isVolume = action.payload;
    },

    setValueVolumeAction: (state, action) => {
      state.valueVolume = action.payload;
    },
  },
});

export const {
  setIsPlayingAction,
  setIsAlbumNextAction,
  setIsAlbumPrevAction,
  setIsSuffleAction,
  setIsRepeatAction,
  setIsVolumeAction,
  setValueVolumeAction,
} = statusReducer.actions;

export default statusReducer.reducer;
