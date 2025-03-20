import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "@emotion/styled";
import { Save, X } from "lucide-react";
import Input from "../../../../components/Input";
import { getSong } from "../../../../api/songsApi";
import { Theme } from "../../../../styles/theme";
import { Song } from "../../types";
import { useDispatch } from "react-redux";
import Button from "../../../../components/Button";

const PageHeader = styled.div<{ theme?: Theme }>`
  margin-bottom: 2rem;
`;

const Title = styled.h1<{ theme?: Theme }>`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${(props) => props.theme.primaryText};
`;

const FormContainer = styled.div<{ theme?: Theme }>`
  max-width: 600px;
  margin: 0 auto;
`;

const ButtonGroup = styled.div<{ theme?: Theme }>`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SongForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
  });

  useEffect(() => {
    const getSongById = async (id: string) => {
      const song = (await getSong(id)).data;
      if (song) {
        setFormData({
          title: song.title,
          artist: song.artist,
          album: song.album,
          genre: song.genre,
        });
      } else {
        navigate("/");
      }
    };
    if (id) {
      getSongById(id);
    }
  }, [id, navigate]);

  const validate = () => {
    let valid = true;
    const newErrors = {
      title: "",
      artist: "",
      album: "",
      genre: "",
    };

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
      valid = false;
    }

    if (!formData.artist.trim()) {
      newErrors.artist = "Artist is required";
      valid = false;
    }

    if (!formData.album.trim()) {
      newErrors.album = "Album is required";
      valid = false;
    }

    if (!formData.genre.trim()) {
      newErrors.genre = "Genre is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  const handleUpdate = (id: string, song: Song) => {
    dispatch({ type: "saga/updateSong", payload: { song, id } });
  };
  const handleAdd = (song: Song) => {
    dispatch({ type: "saga/createSong", payload: song });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      if (id) {
        handleUpdate(id, formData);
      } else {
        handleAdd(formData);
      }
      navigate("/");
    }
  };

  return (
    <>
      <PageHeader>
        <Title>{id ? "Edit Song" : "Add New Song"}</Title>
      </PageHeader>

      <FormContainer>
        <form onSubmit={handleSubmit}>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            label="Title"
            required
            error={errors.title}
          />

          <Input
            id="artist"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            label="Artist"
            required
            error={errors.artist}
          />

          <Input
            id="album"
            name="album"
            value={formData.album}
            onChange={handleChange}
            label="Album"
            required
            error={errors.album}
          />

          <Input
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            label="Genre"
            required
            error={errors.genre}
          />

          <ButtonGroup>
            <Button type="submit">
              <Save size={18} />
              Save
            </Button>
            <Button variant="secondary" onClick={() => navigate("/")}>
              <X size={18} />
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </FormContainer>
    </>
  );
};

export default SongForm;
