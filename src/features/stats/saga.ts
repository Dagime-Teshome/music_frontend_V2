import { call, put, takeLatest } from "redux-saga/effects";
import { statsActions } from "./slice";
import { getAllStats } from "../../api/statsApi";
import { StatsReturnType } from "./types";
import { setLoading, setError } from "../songs/slice";

function* fetchStatsSaga() {
  yield put(setLoading(true));
  try {
    const response: StatsReturnType = yield call(getAllStats);
    yield put(statsActions.setStats(response));
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

export function* statsSagas() {
  yield takeLatest("saga/fetchStats", fetchStatsSaga);
}
