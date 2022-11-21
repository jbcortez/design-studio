import React from "react";
import MenuButton from "./MenuButton";
import { addElement } from "../../redux/elementSlice";
import { useAppDispatch } from "../../redux/reduxHooks";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import { SUBHEADING, HEADING, BODYTEXT } from "../../enums";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Title } from "../../styles/util";
import useElements from "../../hooks/useElements";

const TextMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const elements = useElements().present;

  const handleAddBodyText = () => {
    dispatch(
      addElement({
        selected: [
          {
            ...BODYTEXT,
            style: {
              desktop: {
                ...BODYTEXT.style.desktop,
                zIndex: {
                  value: elements.length + 2,
                },
              },
              mobile: {
                ...BODYTEXT.style.mobile,
                zIndex: {
                  value: elements.length + 2,
                },
              },
            },
            id: uuidv4(),
          },
        ],
      })
    );
  };

  const handleAddHeading = () => {
    dispatch(
      addElement({
        selected: [
          {
            ...HEADING,
            id: uuidv4(),
            style: {
              desktop: {
                ...HEADING.style.desktop,
                zIndex: {
                  value: elements.length + 2,
                },
              },
              mobile: {
                ...HEADING.style.mobile,
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
  const handleAddSubheading = () => {
    dispatch(
      addElement({
        selected: [
          {
            ...SUBHEADING,
            id: uuidv4(),
            style: {
              desktop: {
                ...SUBHEADING.style.desktop,
                zIndex: {
                  value: elements.length + 2,
                },
              },
              mobile: {
                ...SUBHEADING.style.mobile,
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

  return (
    <TextMenuStyles data-testid="text-menu">
      <Title>Text</Title>
      <MenuButton
        style={{ marginBottom: "1.8rem" }}
        fullWidth
        variant={"secondary"}
        label="Add heading"
        onClick={handleAddHeading}
        icon={<AddCircleOutlineIcon style={{ fontSize: 18 }} />}
      />
      <MenuButton
        style={{ marginBottom: "1.8rem" }}
        fullWidth
        variant={"secondary"}
        label="Add subheading"
        onClick={handleAddSubheading}
        icon={<AddCircleOutlineIcon style={{ fontSize: 18 }} />}
      />
      <MenuButton
        style={{ marginBottom: "1.8rem" }}
        fullWidth
        variant={"secondary"}
        label="Add body text"
        onClick={handleAddBodyText}
        icon={<AddCircleOutlineIcon style={{ fontSize: 18 }} />}
      />
    </TextMenuStyles>
  );
};

export default TextMenu;

const TextMenuStyles = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;
  width: calc(35rem - 7.1rem);
  padding: 2rem;
  font-size: 1.2rem;
`;
