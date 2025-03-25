import { put, call, debounce } from "redux-saga/effects";
import { filterSongs } from "../../api/filterApi";
import { SearchType, ReturnType } from "../../types/sharedTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { setSongs } from "../songs/slice";
import { setLoading, setError } from "../songs/slice";

function* filtersSagas(action: PayloadAction<SearchType>) {
  yield put(setLoading(true));
  try {
    const responseData: ReturnType = yield call(filterSongs, action.payload);
    yield put(setSongs(responseData.data));
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
      yield put(setError(errorMessage));
    }
  } finally {
    yield put(setLoading(false));
  }
}

export function* filterSagas() {
  yield debounce(500, "filter/filterSongs", filtersSagas);
}
