import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./reducers/homeReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import featureReducer from "./reducers/featureReducer";
import { persistStore } from "redux-persist";
import songsReducer from "./reducers/songsReducer";
import statusReducer from "./reducers/statusReducer";
import playListReducer from "./reducers/playListReducer";
import searchReducer from "./reducers/searchReducer";

// config cho tat ca cac reducer
const commonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const featureConfig = {
  ...commonConfig,
  key: "feature",
  whitelist: ["songCurrent"],
};

const store = configureStore({
  reducer: {
    homeReducer,
    featureReducer: persistReducer(featureConfig, featureReducer),
    songsReducer,
    statusReducer,
    playListReducer,
    searchReducer,
  },
});

const persistor = persistStore(store);

export { persistor, store };
