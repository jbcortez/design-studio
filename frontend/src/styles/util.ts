import styled from "styled-components";

export const Cover = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
`;

export const ViewContainer = styled.div`
  height: 100%;
`;

export const IconStyles = styled.button`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  transition: background-color 0.1s ease-in;
  border-radius: 2px;
  padding: 0.6rem;
  border: none;
  cursor: pointer;
  background-color: #fff;
  &:hover {
    background-color: ${({ theme }) => theme.color.gray100};
  }
  &:active {
    background-color: ${({ theme }) => theme.color.gray200};
  }
`;

export const disabledStyles: React.CSSProperties = {
  cursor: "not-allowed",
  opacity: "0.2",
};

export const disabled: React.CSSProperties = {
  pointerEvents: "none",
};

// Styles for resize handles

export const se: React.CSSProperties = {
  position: "absolute",
  height: "10px",
  width: "10px",
  border: "1px solid red",
  borderRadius: "50%",
  bottom: "-5px",
  right: "-5px",
  zIndex: "99",
  cursor: "se-resize",
  opacity: "1 !important",
};

export const ne: React.CSSProperties = {
  ...se,
  top: "-5px",
  right: "-5px",
  cursor: "ne-resize",
};

export const sw: React.CSSProperties = {
  ...se,
  bottom: "-5px",
  left: "-5px",
  cursor: "sw-resize",
};

export const nw: React.CSSProperties = {
  ...se,
  top: "-5px",
  left: "-5px",
  cursor: "nw-resize",
};

export const Title = styled.h3`
  color: ${(props) => props.theme.black};
  font-size: 2rem;
  font-weight: bold;
`;

export const Label = styled.label`
  font-size: 1.4rem;
  color: ${(props) => props.theme.color.black};
  margin-bottom: 8px;
  font-weight: 400;
  text-align: left;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  position: relative;
`;
