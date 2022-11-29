import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { setCanvasList } from "../../redux/canvasSlice";
import { useDispatch } from "react-redux";
import { getAllCanvas, updateCanvas } from "../../util/services/canvasServices";
import { setTitle } from "../../redux/elementSlice";
import EditIcon from "@mui/icons-material/Edit";
import { CanvasUpdate } from "../../types";

interface Props {
  title: string;
  canvasId: string;
}

const Title: React.FC<Props> = ({ title, canvasId }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [value, setValue] = useState(title);

  const handleTitleBlur = async (): Promise<void> => {
    if (title !== value) {
      try {
        const canvasData: CanvasUpdate = {
          id: canvasId,
          title: value,
        };
        dispatch(setTitle({ id: canvasId, title: value }));
        await updateCanvas(canvasData);
        const result = await getAllCanvas();

        if (result) dispatch(setCanvasList({ canvasList: result }));
      } catch (error: unknown) {
        if (error instanceof Error) console.error(error.message);
        return;
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && titleRef.current) {
      titleRef.current.blur();
    }
  };

  const handleIconKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" && titleRef.current) {
      titleRef.current.select();
    }
  };

  const selectTitle = (e) => {
    if (titleRef.current) {
      titleRef.current.select();
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (title) setValue(title);
  }, [title]);

  return (
    <Container>
      <TitleStyles
        aria-label="Content Title"
        onKeyDown={handleKeyDown}
        ref={titleRef}
        value={value}
        onChange={handleChange}
        onBlur={handleTitleBlur}
      />
      <InnerContainer>
        <IconContainer
          title={"Edit title"}
          aria-label={"Edit title"}
          contentEditable={false}
          onClick={selectTitle}
          onKeyDown={handleIconKeyDown}
        >
          <EditIcon style={{ fontSize: "1.2rem", color: "inherit" }} />
        </IconContainer>
      </InnerContainer>
    </Container>
  );
};

export default Title;

const TitleStyles = styled.input`
  cursor: pointer;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.color.gray700};
  border: none;
  background: transparent;
  outline: none;
  max-width: fit-content;
`;

const IconContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  color: #fff;
  background: ${(props) => props.theme.color.btnPrimary};
  position: absolute;
  left: -3rem;
  top: -2.5rem;
  cursor: pointer;
`;

const InnerContainer = styled.div`
  position: relative;
  display: flex;
`;

const Container = styled.div`
  position: absolute;
  top: -25px;
  left: 30px;
`;
