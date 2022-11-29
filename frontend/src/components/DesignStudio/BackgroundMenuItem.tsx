import React from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../redux/reduxHooks";
import { setBackgroundImage } from "../../redux/elementSlice";
import useGetCurrentCanvasId from "../../hooks/useGetCurrentCanvasId";

interface Props {
  src: string;
}

const BackgroundMenuItem: React.FC<Props> = ({ src }) => {
  const dispatch = useAppDispatch();
  const id = useGetCurrentCanvasId();

  const handleClick = () => {
    dispatch(setBackgroundImage({ id, src }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(setBackgroundImage({ id, src }));
    }
  };
  return (
    <Container
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      aria-label={"Add background image"}
    >
      <Image src={src} />
    </Container>
  );
};

export default BackgroundMenuItem;

const Container = styled.div`
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: inherit;
`;
