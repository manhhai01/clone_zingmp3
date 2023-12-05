import { createSlice } from "@reduxjs/toolkit";
import http from "../../utils/configInterceptor";

const initialState = {
  searchValues: {},
};

const searchReducer = createSlice({
  name: "searchReducer",
  initialState,
  reducers: {
    setSearchValueAction: (state, action) => {
      state.searchValues = action.payload;
    },
  },
});

export const { setSearchValueAction } =
  searchReducer.actions;

export default searchReducer.reducer;

// async action

export const getSearchValuesActionApi = (keyword) => {
  return async (dispatch) => {
    const res = await http.get(
      `http://localhost:5001/api/search?keyword=${keyword}`
    );
    if (res) {
      const action = setSearchValueAction(res?.data?.data);
      dispatch(action);
    }
  };
};

// export const getSearchSongsActionApi = (pid) => {
//   return async (dispatch) => {
//     const res = await http.get(
//       `http://localhost:5001/api/detailplaylist?id=${pid}`
//     );

//     if (res) {
//       const action = setSearchSongsAction(res?.data?.data);
//       dispatch(action);
//     }
//   };
// };
