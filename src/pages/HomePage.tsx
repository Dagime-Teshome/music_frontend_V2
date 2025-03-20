import { useEffect } from "react";
import styled from "@emotion/styled";
import SongCard from "../features/songs/components/SongCard/SongCard";
import FilterBar from "../features/filters/components/FilterBar";
import { CirclePlus, Music } from "lucide-react";
import { useNavigate } from "react-router";
import { Theme } from "../styles/theme";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { SearchType } from "../types/sharedTypes";
import Button from "../components/Button";
import Card from "../components/Card";

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1<{ theme?: Theme }>`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${(props) => props.theme.primaryText};
`;

const SongGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
`;

const EmptyStateText = styled.p<{ theme?: Theme }>`
  color: ${(props) => props.theme.secondaryText};
  margin: 1rem 0;
`;

const IconContainer = styled.div<{ theme?: Theme }>`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.tertiaryText};
`;

const HomePage: React.FC = () => {
  const songsList = useAppSelector((state) => state.songs.data);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "saga/fetchStats" });
    dispatch({ type: "saga/fetchSongs" });
  }, [dispatch]);

  const onDelete = (id?: string) => {
    dispatch({ type: "saga/deleteSong", payload: id });
  };

  const handleFilterChange = (filters: SearchType) => {
    dispatch({
      type: "filter/filterSongs",
      payload: { searchTerm: filters.searchTerm, genre: filters.genre },
    });
  };

  return (
    <>
      <PageHeader>
        <Title>Your Songs</Title>
        <Button onClick={() => navigate("/add")}>
          <CirclePlus size={18} />
          Add Song
        </Button>
      </PageHeader>

      <FilterBar onFilterChange={handleFilterChange} />

      {songsList.length > 0 ? (
        <SongGrid>
          {songsList.map((song) => (
            <SongCard key={song.id} song={song} onDelete={onDelete} />
          ))}
        </SongGrid>
      ) : (
        <Card>
          <EmptyState>
            <IconContainer>
              <Music size={48} />
            </IconContainer>
            <EmptyStateText>No songs found</EmptyStateText>
          </EmptyState>
        </Card>
      )}
    </>
  );
};

export default HomePage;
