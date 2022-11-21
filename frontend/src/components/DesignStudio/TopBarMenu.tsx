import React, { useRef } from "react";
import styled from "styled-components";

interface Props {
  items: React.ReactElement[];
}

const TopBarMenu: React.FC<Props> = ({ items }) => {
  const menuRef = useRef(null);

  return <Container ref={menuRef}>{items}</Container>;
};

export default TopBarMenu;

const Container = styled.div`
  background: #fff;
  border-radius: 2px;
  box-shadow: ${({ theme }) => theme.shadow[2]};
  position: absolute;
  top: 45px;
  right: 18px;
  padding: 0.5rem;
  z-index: 100;
  display: flex;
  align-items: center;
  margin-right: 0 !important;
`;
