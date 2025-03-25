/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Theme } from "../../../styles/theme";
import { Song } from "../../songs/types";
import { useAppSelector } from "../../../hooks/hooks";
import { useDispatch } from "react-redux";

const PageHeader = styled.div<{ theme?: Theme }>`
  margin-bottom: 2rem;
`;

const Title = styled.h1<{ theme?: Theme }>`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${(props) => props.theme.primaryText};
`;

const StatsGrid = styled.div<{ theme?: Theme }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div<{ theme?: Theme }>`
  background-color: ${(props) => props.theme.surface};
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.2s ease;
  box-shadow: ${(props) => props.theme.shadow};
`;

const StatLabel = styled.h3<{ theme?: Theme }>`
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.secondaryText};
`;

const StatValue = styled.div<{ theme?: Theme }>`
  font-size: 2rem;
  font-weight: 600;
  color: ${(props) => props.theme.primaryText};
`;

const GenreDistribution = styled.div<{ theme?: Theme }>`
  background-color: ${(props) => props.theme.surface};
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.2s ease;
  box-shadow: ${(props) => props.theme.shadow};
`;

const GenreTitle = styled.h2<{ theme?: Theme }>`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.primaryText};
`;

const GenreBar = styled.div<{ theme?: Theme }>`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const GenreName = styled.div<{ theme?: Theme }>`
  width: 100px;
  font-size: 0.9rem;
  color: ${(props) => props.theme.secondaryText};
`;

const BarContainer = styled.div<{ theme?: Theme }>`
  flex: 1;
  background-color: ${(props) => props.theme.border};
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
`;

const Bar = styled.div<{ width: number; theme?: Theme }>`
  background-color: ${(props) => props.theme.accent};
  height: 100%;
  width: ${(props) => props.width}%;
  transition: width 0.3s ease;
`;

const Count = styled.div<{ theme?: Theme }>`
  width: 40px;
  text-align: right;
  font-size: 0.9rem;
  font-weight: 500;
  color: ${(props) => props.theme.secondaryText};
  margin-left: 1rem;
`;

const EmptyState = styled.div<{ theme?: Theme }>`
  text-align: center;
  padding: 3rem;
  background-color: ${(props) => props.theme.surface};
  border-radius: 8px;
`;

const EmptyStateText = styled.p<{ theme?: Theme }>`
  color: ${(props) => props.theme.secondaryText};
`;

const Statistics: React.FC = () => {
  const [statistics, setStatistics] = useState({
    totalSongs: 0,
    uniqueArtists: 0,
    uniqueAlbums: 0,
    totalGenres: 0,
    mostPopularGenre: "None",
    genreCounts: {} as Record<string, number>,
    maxCount: 0,
  });
  const songs = useAppSelector((state) => state.songs.data);
  const stats = useAppSelector((state) => state.stats.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "saga/fetchStats" });

    const uniqueArtists = [...new Set(songs.map((song: Song) => song.artist))];
    const uniqueAlbums = [...new Set(songs.map((song: Song) => song.album))];

    const genreCounts = songs.reduce((acc, song) => {
      acc[song.genre] = (acc[song.genre] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sortedGenres = Object.entries(genreCounts).sort(
      (a, b) => b[1] - a[1]
    );

    const mostPopularGenre =
      sortedGenres.length > 0 ? sortedGenres[0][0] : "None";

    const maxCount =
      sortedGenres.length > 0
        ? Math.max(...sortedGenres.map(([_, count]) => count))
        : 0;

    setStatistics({
      totalSongs: songs.length,
      uniqueArtists: uniqueArtists.length,
      uniqueAlbums: uniqueAlbums.length,
      totalGenres: Object.keys(genreCounts).length,
      mostPopularGenre,
      genreCounts,
      maxCount,
    });
  }, [songs]);

  if (statistics.totalSongs === 0) {
    return (
      <>
        <PageHeader>
          <Title>Statistics</Title>
        </PageHeader>

        <EmptyState>
          <EmptyStateText>
            Add some songs to see your collection statistics.
          </EmptyStateText>
        </EmptyState>
      </>
    );
  }

  return (
    <>
      <PageHeader>
        <Title>Statistics</Title>
      </PageHeader>

      <StatsGrid>
        <StatCard>
          <StatLabel>Total Songs</StatLabel>
          <StatValue>{stats.generalStats?.totalSongs}</StatValue>
        </StatCard>

        <StatCard>
          <StatLabel>Total Artists</StatLabel>
          <StatValue>{stats.generalStats?.totalArtists}</StatValue>
        </StatCard>

        <StatCard>
          <StatLabel>Total Albums</StatLabel>
          <StatValue>{stats.generalStats?.totalAlbums}</StatValue>
        </StatCard>

        <StatCard>
          <StatLabel>Total Genres</StatLabel>
          <StatValue>{stats?.generalStats?.totalGenres}</StatValue>
        </StatCard>

        <StatCard>
          <StatLabel>Most Popular Genre</StatLabel>
          <StatValue>{statistics.mostPopularGenre}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Most Popular Artist</StatLabel>
          <StatValue>{stats.PopularArtist?.[0]?.artist}</StatValue>
        </StatCard>
      </StatsGrid>

      <GenreDistribution>
        <GenreTitle>Genre Distribution</GenreTitle>

        {Object.entries(statistics.genreCounts)
          .sort(([_, countA], [__, countB]) => countB - countA)
          .map(([genre, count]) => (
            <GenreBar key={genre}>
              <GenreName>{genre}</GenreName>
              <BarContainer>
                <Bar width={(count / statistics.maxCount) * 100} />
              </BarContainer>
              <Count>{count}</Count>
            </GenreBar>
          ))}
      </GenreDistribution>
    </>
  );
};

export default Statistics;
