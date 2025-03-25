export interface Stats {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  songsPerGenre: Record<string, number>;
  songsPerArtist: Record<string, number>;
  albumsPerArtist: Record<string, number>;
  songsPerAlbum: Record<string, number>;
}

export type StatsState = {
  data: StatReturnType;
};

export type StatObject = {
  songCount?: number;
  artist?: string;
};
export type generalStats = {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
};

export type StatReturnType = {
  generalStats?: generalStats;
  PopularArtist?: StatObject[] | undefined;
  LeastPopularArtist?: StatObject[];
  AlbumWithMostSongs?: StatObject[];
};

export type StatsReturnType = {
  success: boolean;
  message: string;
  data: StatReturnType;
};
