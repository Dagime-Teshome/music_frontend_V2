import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { ChevronDown, Search } from "lucide-react";
import { getGenres } from "../../../api/filterApi";
import { SearchType, Theme } from "../../../types/sharedTypes";

interface FilterBarProps {
  onFilterChange: (filters: SearchType) => void;
}

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 200px;
`;

const SearchInput = styled.input<{ theme?: Theme }>`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  background-color: ${(props) => props.theme.surface};
  color: ${(props) => props.theme.primaryText};
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme.accent};
  }

  &::placeholder {
    color: ${(props) => props.theme.tertiaryText};
  }
`;

const SearchIcon = styled.div<{ theme?: Theme }>`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.tertiaryText};
`;
const SelectContainer = styled.div`
  position: relative;
  width: fit-content;
`;

const GenreSelect = styled.select<{ theme?: Theme }>`
  padding: 0.75rem 1rem;
  padding-right: 2.5rem;
  background-color: ${(props) => props.theme.surface};
  color: ${(props) => props.theme.primaryText};
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  min-width: 150px;
  transition: all 0.2s ease;
  appearance: none;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme.accent};
  }
`;

const DropdownIcon = styled.div<{ theme?: Theme }>`
  position: absolute;
  top: 55%;
  right: 1rem;
  transform: translateY(-50%);
  pointer-events: none; // Ensure the icon doesn't interfere with select clicks
  color: ${(props) => props.theme.primaryText};
`;

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGenre, setFilterGenre] = useState("All");
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGenresList = async () => {
      const loadedGenres = await getGenres();
      setGenres(loadedGenres.data);
      setLoading(false);
    };
    getGenresList();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(() => {
      onFilterChange({ searchTerm: e.target.value, genre: filterGenre });
      return e.target.value;
    });
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterGenre(() => {
      onFilterChange({ searchTerm: searchTerm, genre: e.target.value });
      return e.target.value;
    });
  };

  return (
    <FilterContainer>
      <SearchContainer>
        <SearchIcon>
          <Search size={18} />
        </SearchIcon>
        <SearchInput
          type="text"
          placeholder="Search by title or artist.... "
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </SearchContainer>
      <SelectContainer>
        <GenreSelect
          value={filterGenre}
          onChange={handleGenreChange}
          disabled={loading}
        >
          <option value="All">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </GenreSelect>
        <DropdownIcon>
          <ChevronDown size={16} />
        </DropdownIcon>
      </SelectContainer>
    </FilterContainer>
  );
};

export default FilterBar;
