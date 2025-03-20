import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import { Theme } from "../types/sharedTypes";

interface CardProps {
  children: ReactNode;
  hoverable?: boolean;
}

const CardContainer = styled.div<{ hoverable: boolean; theme?: Theme }>`
  background-color: ${(props) => props.theme.surface};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
  box-shadow: ${(props) => props.theme.shadow};
  padding: 0;

  ${(props) =>
    props.hoverable &&
    `
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  `}
`;

const Card: React.FC<CardProps> = ({ children, hoverable = false }) => {
  return <CardContainer hoverable={hoverable}>{children}</CardContainer>;
};

export default Card;
