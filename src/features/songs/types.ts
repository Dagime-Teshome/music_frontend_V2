export type Song = {
  id?: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SongsState = {
  data: Song[];
  loading: boolean;
  error: string | null;
};

export interface AddSongFormProps {
  isVisible: boolean;
  updateMode?: boolean;
  editData?: Song;
  onAddSong: (song: Song) => void;
  onCancel: () => void;
}
export interface ConfirmDialogProps {
  isVisible: boolean;
  songData?: Song;
  onConfirm: (id: string | undefined) => void;
  onCancel: () => void;
}
