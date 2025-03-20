import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "@emotion/styled";
import { Pencil, Trash2 } from "lucide-react";
import Button from "../../../../components/Button";
import { Theme } from "../../../../types/sharedTypes";
// import { useAppDispatch } from "../../../../hooks/hooks";
import { Song } from "../../types";
import Card from "../../../../components/Card";
import Modal from "../../../../components/Modal";

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  padding: 1.25rem;
`;

const GenreBadge = styled.span<{ theme?: Theme }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: ${(props) => props.theme.tag};
  color: ${(props) => props.theme.tagText};
  padding: 0.35rem 0.85rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const Title = styled.h3<{ theme?: Theme }>`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.primaryText};
  line-height: 1.3;
  padding-right: 2rem;
`;

const MetadataSection = styled.div`
  flex: 1;
`;

const Artist = styled.p<{ theme?: Theme }>`
  font-size: 0.95rem;
  color: ${(props) => props.theme.secondaryText};
  margin-bottom: 0.25rem;
  font-weight: 500;
`;

const Album = styled.p<{ theme?: Theme }>`
  font-size: 0.875rem;
  color: ${(props) => props.theme.tertiaryText};
  margin-bottom: 0;
`;

const Actions = styled.div<{ theme?: Theme }>`
  display: flex;
  gap: 0.5rem;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;

const ActionButton = styled.button<{ theme?: Theme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  background: transparent;
  color: ${(props) => props.theme.secondaryText};

  &:hover {
    color: ${(props) => props.theme.primaryText};
    background-color: ${(props) => props.theme.surfaceHover};
  }
`;

const ModalText = styled.p<{ theme?: Theme }>`
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.secondaryText};
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

interface SongCardProps {
  song: Song;
  onDelete: (id: string | undefined) => void;
}

const SongCard: React.FC<SongCardProps> = ({ song, onDelete }) => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  //   const dispatch = useAppDispatch();

  const handleEdit = () => {
    navigate(`/edit/${song.id}`);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    closeDeleteModal();
    onDelete(song.id);
  };

  return (
    <>
      <Card hoverable>
        <CardContent>
          <GenreBadge>{song.genre}</GenreBadge>
          <Title>{song.title}</Title>

          <MetadataSection>
            <Artist>{song.artist}</Artist>
            <Album>{song.album}</Album>
          </MetadataSection>

          <Actions>
            <ActionButton onClick={handleEdit}>
              <Pencil size={16} />
            </ActionButton>
            <ActionButton onClick={openDeleteModal}>
              <Trash2 size={16} />
            </ActionButton>
          </Actions>
        </CardContent>
      </Card>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="Confirm Deletion"
      >
        <ModalText>
          Are you sure you want to delete <strong>{song.title}</strong> by{" "}
          {song.artist}? This action cannot be undone.
        </ModalText>
        <ModalActions>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button onClick={confirmDelete}>Delete</Button>
        </ModalActions>
      </Modal>
    </>
  );
};

export default SongCard;
