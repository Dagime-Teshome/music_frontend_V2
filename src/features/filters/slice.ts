import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterCriteria, FiltersState } from "./types";

const initialState: FiltersState = {
  criteria: {},
  isActive: false,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilterCriteria: (state, action: PayloadAction<FilterCriteria>) => {
      state.criteria = action.payload;
      state.isActive = Object.values(action.payload).some(
        (val) => val !== undefined && val !== ""
      );
    },
    clearFilters: (state) => {
      state.criteria = {};
      state.isActive = false;
    },
  },
});

export const filtersActions = filtersSlice.actions;
export default filtersSlice.reducer;
