import React from "react";
import styled from "@emotion/styled";
import { Theme } from "../types/sharedTypes";

interface InputProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  label?: string;
  error?: string;
}

const InputContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const InputLabel = styled.label<{ theme?: Theme }>`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${(props) => props.theme.secondaryText};
`;

const InputField = styled.input<{ theme?: Theme }>`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  background-color: ${(props) => props.theme.surface};
  color: ${(props) => props.theme.primaryText};
  border: none;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(props) => props.theme.accent};
  }
`;

const ErrorMessage = styled.div<{ theme?: Theme }>`
  color: ${(props) => props.theme.error};
  font-size: 0.85rem;
  margin-top: 0.5rem;
`;

const Input: React.FC<InputProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  label,
  error,
}) => {
  return (
    <InputContainer>
      {label && (
        <InputLabel htmlFor={id}>
          {label}
          {required && " *"}
        </InputLabel>
      )}
      <InputField
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        required={required}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default Input;
