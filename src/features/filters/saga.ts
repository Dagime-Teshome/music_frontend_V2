import { put, call, debounce } from "redux-saga/effects";
import { filterSongs } from "../../api/filterApi";
import { SearchType, ReturnType } from "../../types/sharedTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { setSongs } from "../songs/slice";

function* filtersSagas(action: PayloadAction<SearchType>) {
  try {
    const responseData: ReturnType = yield call(filterSongs, action.payload);
    yield put(setSongs(responseData.data));
  } catch (error) {
    console.error(error);
  }
}

export function* filterSagas() {
  yield debounce(500, "filter/filterSongs", filtersSagas);
}
