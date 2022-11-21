import React from "react";
import MenuButton from "./MenuButton";
import styled from "styled-components";
import useCurrentComponent from "../../hooks/useCurrentComponent";
import { addElement, setImageSrc } from "../../redux/elementSlice";
import { useAppDispatch } from "../../redux/reduxHooks";
import { IMAGE } from "../../enums";
import { v4 as uuidv4 } from "uuid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Title } from "../../styles/util";
import useElements from "../../hooks/useElements";
import ImageInfo from "./ImageInfo";
import useTargetElement from "../../hooks/useTargetElement";

const ImagesMenu = () => {
  const currentComponent = useCurrentComponent();

  const dispatch = useAppDispatch();
  const elements = useElements().present;
  const targetElement = useTargetElement();

  const handleAddImage = () => {
    dispatch(
      addElement({
        selected: [
          {
            ...IMAGE,
            id: uuidv4(),
            src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            style: {
              desktop: {
                ...IMAGE.style.desktop,
                zIndex: {
                  value: elements.length + 2,
                },
              },
              mobile: {
                ...IMAGE.style.mobile,
                zIndex: {
                  value: elements.length + 2,
                },
              },
            },
          },
        ],
      })
    );
  };

  const handleAddOAImage = (src: string) => {
    dispatch(
      addElement({
        selected: [
          {
            ...IMAGE,
            id: uuidv4(),
            src,
            style: {
              desktop: {
                ...IMAGE.style.desktop,
                zIndex: {
                  value: elements.length + 2,
                },
              },
              mobile: {
                ...IMAGE.style.mobile,
                zIndex: {
                  value: elements.length + 2,
                },
              },
            },
          },
        ],
      })
    );
  };

  const handleChangeImage = () => {
    if (currentComponent.id !== null) {
      dispatch(
        setImageSrc({
          src: "https://images.unsplash.com/photo-1647960611051-4b07f8d381e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1122&q=80",
          undo: true,
          id: currentComponent.id,
        })
      );
    }
  };

  const handleKeyDown = (e, url) => {
    if (e.key === "Enter") {
      handleAddOAImage(url);
    }
  };

  return (
    <ImagesMenuStyles data-testid="media-menu">
      {targetElement?.type === "image" && <ImageInfo />}
      <Title>Images</Title>
      <MenuButton
        variant={"secondary"}
        fullWidth
        label="Add Image"
        onClick={handleAddImage}
        icon={<AddCircleOutlineIcon style={{ fontSize: 18 }} />}
      />
      {currentComponent.type === "image" && (
        <MenuButton
          fullWidth
          variant={"secondary"}
          label="Change Image"
          onClick={handleChangeImage}
        />
      )}
      <ImageMenuItem
        src={
          "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/beach_background_optimized.jpg"
        }
        tabIndex={0}
        onKeyDown={(e) =>
          handleKeyDown(
            e,
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/beach_background.jpg"
          )
        }
        onClick={() =>
          handleAddOAImage(
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/beach_background.jpg"
          )
        }
      />
      <ImageMenuItem
        src={
          "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/beach_optimized.jpg"
        }
        onKeyDown={(e) =>
          handleKeyDown(
            e,
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/beach.jpg"
          )
        }
        tabIndex={0}
        onClick={() =>
          handleAddOAImage(
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/beach.jpg"
          )
        }
      />
      <ImageMenuItem
        src={
          "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/boardwalk_optimized.jpg"
        }
        onKeyDown={(e) =>
          handleKeyDown(
            e,
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/boardwalk.jpg"
          )
        }
        tabIndex={0}
        onClick={() =>
          handleAddOAImage(
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/boardwalk.jpg"
          )
        }
      />
      <ImageMenuItem
        src={
          "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/joshuatree_optimized.jpg"
        }
        onKeyDown={(e) =>
          handleKeyDown(
            e,
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/joshuatree.jpg"
          )
        }
        tabIndex={0}
        onClick={() =>
          handleAddOAImage(
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/joshuatree.jpg"
          )
        }
      />
      <ImageMenuItem
        src={
          "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/joshuatree2_optimized.jpg"
        }
        onKeyDown={(e) =>
          handleKeyDown(
            e,
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/joshuatree2.jpg"
          )
        }
        tabIndex={0}
        onClick={() =>
          handleAddOAImage(
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/joshuatree2.jpg"
          )
        }
      />
      <ImageMenuItem
        src={
          "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/mountain_lg_optimized.jpg"
        }
        tabIndex={0}
        onKeyDown={(e) =>
          handleKeyDown(
            e,
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/mountain_lg.jpg"
          )
        }
        onClick={() =>
          handleAddOAImage(
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/mountain_lg.jpg"
          )
        }
      />
      <ImageMenuItem
        src={
          "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/pacific_optimized.jpg"
        }
        tabIndex={0}
        onKeyDown={(e) =>
          handleKeyDown(
            e,
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/pacific.jpg"
          )
        }
        onClick={() =>
          handleAddOAImage(
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/pacific.jpg"
          )
        }
      />
      <ImageMenuItem
        src={
          "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/otter2_optimized.jpg"
        }
        onKeyDown={(e) =>
          handleKeyDown(
            e,
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/otter2.jpg"
          )
        }
        tabIndex={0}
        onClick={() =>
          handleAddOAImage(
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/otter2.jpg"
          )
        }
      />
      <ImageMenuItem
        src={
          "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/avocado_toast_optimized.jpg"
        }
        onKeyDown={(e) =>
          handleKeyDown(
            e,
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/avocado_toast.jpg"
          )
        }
        tabIndex={0}
        onClick={() =>
          handleAddOAImage(
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/avocado_toast.jpg"
          )
        }
      />
      <ImageMenuItem
        src={
          "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/pastry_optimized.jpg"
        }
        tabIndex={0}
        onKeyDown={(e) =>
          handleKeyDown(
            e,
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/pastry.jpg"
          )
        }
        onClick={() =>
          handleAddOAImage(
            "https://oceanapps.nyc3.cdn.digitaloceanspaces.com/template_images/pastry.jpg"
          )
        }
      />
    </ImagesMenuStyles>
  );
};

export default ImagesMenu;

const ImagesMenuStyles = styled.div`
  height: 100%;
  width: calc(35rem - 7.1rem);
  padding: 2rem;
  font-size: 1.2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: ${(props) => props.theme.spacing[4]};
  }
`;

const ImageMenuItem = styled.img`
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
`;
