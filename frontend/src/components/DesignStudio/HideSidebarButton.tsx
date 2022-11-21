import React from "react";
import styled from "styled-components";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useAppDispatch } from "../../redux/reduxHooks";
import { setShowSidebar } from "../../redux/sidebarViewSlice";
import useShowSidebar from "../../hooks/useShowSidebar";

const HideSidebarButton = () => {
  const dispatch = useAppDispatch();
  const showSidebar = useShowSidebar();

  const handleHideSidebar = () => {
    if (showSidebar) {
      dispatch(setShowSidebar(false));
    } else {
      dispatch(setShowSidebar(true));
    }
  };

  return (
    <Container>
      <ButtonStyles onClick={handleHideSidebar}>
        {showSidebar ? (
          <ArrowBackIosNewIcon style={{ fontSize: "18px", color: "#aaa" }} />
        ) : (
          <ArrowForwardIosIcon style={{ fontSize: "18px", color: "#aaa" }} />
        )}
      </ButtonStyles>
    </Container>
  );
};

export default HideSidebarButton;

const Container = styled.div`
  position: absolute;
  right: -2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
`;

const ButtonStyles = styled.button`
  border: 1px solid ${(props) => props.theme.color.gray200};
  background: #fff;
  width: 2rem;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  border-left: 2px solid ${(props) => props.theme.color.gray200};
  box-shadow: ${({ theme }) => theme.shadow[2]};

  &::before {
    display: ${(props) => (props.id !== "9" ? "flex" : "none")};
    content: "";
    position: absolute;
    background-color: transparent;
    bottom: -50px;
    height: 50px;
    width: 8px;
    left: 0;
    border-top-left-radius: 25px;
  }

  &::after {
    content: "";
    position: absolute;

    background-color: transparent;
    height: 50px;
    width: 8px;
    bottom: 80px;
    left: 0;
    border-bottom-left-radius: 25px;
  }
`;
