import React, { useState } from "react";
import styled from "styled-components";
import SelectDesignView from "./SelectDesignView";
import LandingView from "./LandingView";

const Modal: React.FC = () => {
  const [view, setView] = useState(0);

  return (
    <>
      <ModalContainer view={view}>
        {view === 0 ? (
          <LandingView setView={setView} />
        ) : (
          <SelectDesignView setView={setView} />
        )}
      </ModalContainer>
      <Cover />
    </>
  );
};

export default Modal;

const ModalContainer = styled.aside<{ view: number }>`
  width: ${(props) => (props.view === 1 ? "51.5rem" : "40rem")};
  border-radius: 5px;
  background-color: ${(props) => props.theme.color.white};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: ${(props) => props.theme.shadow[4]};
  z-index: 3000;
`;

const Cover = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.3);
`;
