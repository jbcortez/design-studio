import React, { useState } from "react";
import { Cover } from "../../styles/util";
import LinkIcon from "@mui/icons-material/Link";
import TextInputWithOptions from "./TextInputWithOptions";
import styled from "styled-components";

interface Props {
  id?: string;
}

const LinkIconBtn: React.FC<Props> = ({ id }) => {
  const [showLinkMenu, setShowLinkMenu] = useState<boolean>(false);
  return (
    <LinkButtonContainer
      show={showLinkMenu}
      aria-label="Create link"
      title={"Create link"}
      id={id}
    >
      {showLinkMenu && (
        <>
          <Cover onClick={() => setShowLinkMenu(false)} />
          <MenuContainer>
            <TextInputWithOptions id={"typography-link"} label={"Link URL"} />
          </MenuContainer>
        </>
      )}
      <LinkIcon
        fontSize="large"
        onClick={() => setShowLinkMenu(!showLinkMenu)}
      />
    </LinkButtonContainer>
  );
};

export default LinkIconBtn;

const MenuContainer = styled.div`
  background: #fff;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadow[2]};
  position: absolute;
  top: 45px;
  right: 0;
  padding: 2rem;
  width: 35rem;
  z-index: 1000;
`;

const LinkButtonContainer = styled.button<{ show: boolean }>`
  -webkit-transition: background-color 0.1s ease-in-out;
  transition: background-color 0.1s ease-in-out;
  border-radius: 2px;
  padding: 0.6rem;
  cursor: pointer;
  position: relative;
  border: none;
  background-color: ${(props) =>
    props.show ? props.theme.color.gray200 : "#FFF"};

  &:hover {
    background-color: ${(props) =>
      props.show ? props.theme.color.gray200 : props.theme.color.gray100};
  }
`;
