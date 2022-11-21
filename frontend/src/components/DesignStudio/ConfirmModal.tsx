import React from "react";
import styled from "styled-components";
import MenuButton from "./MenuButton";

interface Props {
  handleCloseModal: () => void;
  message: string;
}

const ConfirmModal: React.FC<Props> = ({ message, handleCloseModal }) => {
  return (
    <>
      <ModalStyles>
        <Message>{message}</Message>
        <MenuButton
          onClick={handleCloseModal}
          label={"Confirm"}
          variant={"secondary"}
        />
      </ModalStyles>
      <Backdrop onClick={handleCloseModal} />
    </>
  );
};

export default ConfirmModal;

const ModalStyles = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  z-index: 15;
  border-radius: 5px;
  box-shadow: ${(props) => props.theme.shadow[2]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing[4]};
`;

const Message = styled.p`
  font-size: 1.6rem;
  color: ${(props) => props.theme.color.text};
  text-align: center;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;
