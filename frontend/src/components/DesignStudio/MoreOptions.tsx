import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styled from "styled-components";

interface Props {
  onClick: React.MouseEventHandler;
  active: boolean;
}

const MoreOptions: React.FC<Props> = ({ onClick, active }) => {
  return (
    <IconStyles
      active={active}
      onClick={onClick}
      aria-label="More Options"
      title={"More options"}
    >
      <MoreHorizIcon fontSize="large" />
    </IconStyles>
  );
};

export default MoreOptions;

export const IconStyles = styled.button<{ active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.1s ease-in;
  border-radius: 2px;
  padding: 0.6rem;
  border: none;
  cursor: pointer;
  margin-right: 0 !important;
  background-color: ${(props) =>
    props.active ? props.theme.color.gray200 : "#FFF"};
  &:hover {
    background-color: ${({ theme }) => theme.color.gray100};
  }
`;
