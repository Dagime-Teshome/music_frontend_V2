import { combineReducers } from "@reduxjs/toolkit";
import songsReducer from "../features/songs/slice";
// import filtersReducer from "../features/filters/slice";
import statsReducer from "../features/stats/slice";

const rootReducer = combineReducers({
  songs: songsReducer,
  stats: statsReducer,
});

export default rootReducer;
