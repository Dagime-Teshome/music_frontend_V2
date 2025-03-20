export type FilterCriteria = {
  genre?: string;
  artist?: string;
  album?: string;
  searchTerm?: string;
};

export type FiltersState = {
  criteria: FilterCriteria;
  isActive: boolean;
};
