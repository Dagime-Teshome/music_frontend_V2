import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import { Theme } from "../styles/theme";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  variant?: ButtonVariant;
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const ButtonElement = styled.button<{ variant: ButtonVariant; theme?: Theme }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  background-color: ${(props) =>
    props.variant === "primary" ? props.theme.accent : props.theme.surface};

  color: ${(props) =>
    props.variant === "primary"
      ? props.theme.background
      : props.theme.secondaryText};

  &:hover {
    opacity: ${(props) => (props.variant === "primary" ? 0.9 : 1)};
    background-color: ${(props) =>
      props.variant === "primary"
        ? props.theme.accent
        : props.theme.surfaceHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <ButtonElement
      variant={variant}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </ButtonElement>
  );
};

export default Button;
