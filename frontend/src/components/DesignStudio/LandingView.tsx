import MenuButton from "./MenuButton";
import React from "react";
import styled from "styled-components";
import { createCanvas, getAllCanvas } from "../../util/services/canvasServices";
import { NEW_CANVAS } from "../../enums";
import { useNavigate } from "react-router-dom";
import { setCanvasList } from "../../redux/canvasSlice";
import { useAppDispatch } from "../../redux/reduxHooks";

const LandingView = ({ setView }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleNewDesign = async () => {
    const id = await createCanvas(NEW_CANVAS);

    const canvasList = await getAllCanvas();
    if (canvasList) dispatch(setCanvasList({ canvasList }));

    navigate(`/design?content-id=${id}`);
  };
  return (
    <Container>
      <Heading>
        Welcome to the Content Scheduler Design Studio. What would you like to
        do?
      </Heading>
      <MenuButton
        label={"Create New Design"}
        variant={"secondary"}
        onClick={handleNewDesign}
      />
      <MenuButton
        label={"Select Existing Design"}
        variant={"secondary"}
        onClick={() => setView(1)}
      />
    </Container>
  );
};

export default LandingView;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing[6]};

  & > *:not(:last-child) {
    margin-bottom: ${(props) => props.theme.spacing[4]};
  }
`;

const Heading = styled.p`
  text-align: center;
  font-size: 1.6rem;
  margin: 0 auto;
`;
