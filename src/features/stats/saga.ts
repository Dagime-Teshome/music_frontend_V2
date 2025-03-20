import { call, put, takeLatest } from "redux-saga/effects";
import { statsActions } from "./slice";
import { getAllStats } from "../../api/statsApi";
import { StatsReturnType } from "./types";

function* fetchStatsSaga() {
  try {
    const response: StatsReturnType = yield call(getAllStats);
    yield put(statsActions.fetchStatsSuccess(response));
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
      yield put(statsActions.fetchStatsFailure(errorMessage));
    }
  }
}

export function* statsSagas() {
  yield takeLatest("saga/fetchStats", fetchStatsSaga);
}
