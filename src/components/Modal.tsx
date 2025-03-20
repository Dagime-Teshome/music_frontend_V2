import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { X } from "lucide-react";
import { Theme } from "../types/sharedTypes";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ModalBackdrop = styled.div<{ theme?: Theme }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  backdrop-filter: blur(2px);
`;

const ModalContainer = styled.div<{ theme?: Theme }>`
  background-color: ${(props) => props.theme.surface};
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.2s ease-out;

  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const ModalHeader = styled.div<{ theme?: Theme }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.border};
`;

const ModalTitle = styled.h3<{ theme?: Theme }>`
  font-weight: 600;
  font-size: 1.1rem;
  color: ${(props) => props.theme.primaryText};
`;

const CloseButton = styled.button<{ theme?: Theme }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.secondaryText};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.surfaceHover};
    color: ${(props) => props.theme.primaryText};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme.accent};
  }
`;

const ModalContent = styled.div<{ theme?: Theme }>`
  padding: 1.5rem;
`;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";

      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 10);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <ModalBackdrop onClick={handleBackdropClick}>
      <ModalContainer ref={modalRef}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton
            onClick={onClose}
            ref={closeButtonRef}
            aria-label="Close modal"
          >
            <X size={20} />
          </CloseButton>
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </ModalBackdrop>,
    document.body
  );
};

export default Modal;
