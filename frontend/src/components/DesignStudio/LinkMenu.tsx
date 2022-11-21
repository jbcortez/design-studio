import React from "react";
import styled from "styled-components";
import { Cover } from "../../styles/util";
import TextInputWithOptions from "./TextInputWithOptions";

interface Props {
  setShowLinkMenu: (value: boolean | ((prevVal: boolean) => boolean)) => void;
}

const LinkMenu: React.FC<Props> = ({ setShowLinkMenu }) => {
  return (
    <>
      <Cover onClick={() => setShowLinkMenu(false)} />
      <MenuContainer>
        <TextInputWithOptions id={"typography-link"} label={"Link URL"} />
      </MenuContainer>
    </>
  );
};

export default LinkMenu;

const MenuContainer = styled.div`
  background: #fff;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadow[2]};
  position: absolute;
  top: 45px;
  right: 0;
  padding: 2rem;
  width: 35rem;
  z-index: 100;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const PrimaryLabel = styled.p`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${(props) => props.theme.gray900};
  padding-right: 1rem;
  margin-bottom: 0;
`;

const SecondaryLabel = styled.label`
  font-size: 1.2rem;
  font-weight: 400;
  color: ${(props) => props.theme.gray900};
  padding-right: 2rem;
`;

const IconStyles = styled.button<{ active: boolean }>`
  transition: background-color 0.1s ease-in;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 0.5rem;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.active ? props.theme.color.gray200 : "#FFF"};
  &:hover {
    background-color: ${({ theme }) => theme.color.gray100};
  }
  &:active {
    background-color: ${({ theme }) => theme.color.gray200};
  }
`;

const BorderRadiusIcon = styled.img``;
