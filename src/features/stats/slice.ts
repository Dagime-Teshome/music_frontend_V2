import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatsReturnType, StatsState } from "./types";

const initialState: StatsState = {
  data: {},
};

const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    setStats: (state, action: PayloadAction<StatsReturnType>) => {
      state.data = action.payload.data;
    },
  },
});

export const statsActions = statsSlice.actions;
export default statsSlice.reducer;
