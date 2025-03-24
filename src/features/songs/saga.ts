import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import {
  setLoading,
  setError,
  setSongs,
  addSong,
  updateSong,
  deleteSong,
} from "./slice";
import { Song } from "./types";

import {
  fetchSongs as fetchSongsApi,
  addSong as addSongApi,
  updateSong as updateSongApi,
  deleteSong as deleteSongApi,
} from "../../api/songsApi";
import {
  SingleReturnType,
  ReturnType,
  UpdateSongAction,
} from "../../types/sharedTypes";

export const fetchSongs = () => ({ type: "songs/fetchSongs" });

function* fetchSongsSaga() {
  yield put(setLoading(true));
  try {
    const response: ReturnType = yield call(fetchSongsApi);
    yield put(setSongs(response.data));
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(setError(errorMessage));
  } finally {
    yield put(setLoading(false));
  }
}

function* addSongSaga(action: PayloadAction<Omit<Song, "id">>) {
  yield put(setLoading(true));
  try {
    const response: SingleReturnType = yield call(addSongApi, action.payload);
    toast.success("Song Created");
    yield put(addSong(response.data));
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
      toast.error(errorMessage);
    }
    yield put(setError(errorMessage));
  } finally {
    yield put(setLoading(false));
  }
}

function* updateSongSaga(action: PayloadAction<UpdateSongAction>) {
  try {
    const response: SingleReturnType = yield call(
      updateSongApi,
      action.payload.song,
      action.payload.id
    );
    if (response.success) {
      yield put(updateSong(response.data));
      toast.success("Song Updated");
    }
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
      toast.error(errorMessage);
    }
    yield put(setError(errorMessage));
  } finally {
    yield put(setLoading(false));
  }
}

function* deleteSongSaga(action: PayloadAction<string>) {
  yield put(setLoading(true));
  try {
    yield call(deleteSongApi, action.payload);
    toast.success("Song Deleted");
    yield put(deleteSong(action.payload));
  } catch (error) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
      toast.error(errorMessage);
    }
    yield put(setError(errorMessage));
  } finally {
    yield put(setLoading(false));
  }
}

export function* songsSagas() {
  yield takeLatest("saga/fetchSongs", fetchSongsSaga);
  yield takeLatest("saga/createSong", addSongSaga);
  yield takeLatest("saga/updateSong", updateSongSaga);
  yield takeLatest("saga/deleteSong", deleteSongSaga);
}
