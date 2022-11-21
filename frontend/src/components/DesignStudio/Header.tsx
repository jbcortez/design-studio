import React from "react";
import { useAppDispatch } from "../../redux/reduxHooks";
import { redo, setEditingMode, undo } from "../../redux/elementSlice";
import useElements from "../../hooks/useElements";
import useGetEditingMode from "../../hooks/useGetEditingMode";
import styled from "styled-components";
import MenuButton from "./MenuButton";
import useUnsavedStatus from "../../hooks/useUnsavedStatus";
import { updateContent } from "../../util/services/contentServices";
import useGetCurrentContent from "../../hooks/useGetCurrentContent";
import SavedStatus from "./SavedStatus";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import DesktopMacOutlinedIcon from "@mui/icons-material/DesktopMacOutlined";

const Header = () => {
  const dispatch = useAppDispatch();
  const editingMode = useGetEditingMode();
  const elements = useElements();
  const contentData = useGetCurrentContent();

  const handleUndo = () => {
    if (elements.past.length > 0) dispatch(undo());
  };

  const handleRedo = () => {
    if (elements.future.length > 0) dispatch(redo());
  };

  const handleSetDesktop = () => {
    dispatch(setEditingMode({ editingMode: "desktop" }));
  };

  const handleSetMobile = () => {
    dispatch(setEditingMode({ editingMode: "mobile" }));
  };

  const handlePreview = async () => {
    if (contentData) await updateContent(contentData);
  };

  return (
    <HeaderContainer data-testid="header">
      <SavedStatus isUnsaved={useUnsavedStatus()} />
      <IconsContainer>
        <HeaderIcon onClick={handleUndo} aria-label="Undo">
          <UndoIcon style={{ color: "#FFF", fontSize: "28px" }} />
        </HeaderIcon>
        <HeaderIcon onClick={handleRedo} aria-label="Redo">
          <RedoIcon style={{ color: "#FFF", fontSize: "28px" }} />
        </HeaderIcon>
      </IconsContainer>
      <Separator />
      <IconsContainer>
        <HeaderIcon
          id="desktop-button"
          onClick={handleSetDesktop}
          editingMode={editingMode}
          aria-label="Desktop mode"
        >
          <DesktopMacOutlinedIcon style={{ color: "#FFF", fontSize: "28px" }} />
        </HeaderIcon>

        <HeaderIcon
          id="mobile-button"
          onClick={handleSetMobile}
          editingMode={editingMode}
          aria-label="Mobile"
        >
          <PhoneIphoneIcon style={{ color: "#FFF", fontSize: "28px" }} />
        </HeaderIcon>
      </IconsContainer>
      <MenuButton
        variant="primary"
        label="Preview"
        style={PreviewButtonStyles}
        onClick={handlePreview}
      />
    </HeaderContainer>
  );
};

export default Header;

const PreviewButtonStyles: React.CSSProperties = {
  position: "absolute",
  right: ".5rem",
};

const HeaderContainer = styled.header`
  height: 4.8rem;
  background-color: ${({ theme }) => theme.color.blue900};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 10;
`;

const Separator = styled.div`
  width: 3px;
  background: #fff;
  height: 70%;
  border-radius: 10px;
  margin: 0 ${(props) => props.theme.spacing[2]};
`;

const HeaderIcon = styled.button<{ editingMode?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  margin: 0 0.5rem;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;
  border-color: transparent;
  border-radius: 3px;
  background-color: ${(props) =>
    props.id === props.editingMode + "-button"
      ? props.theme.color.btnPrimary
      : "transparent"};

  &:hover {
    background-color: ${({ theme }) => theme.color.btnPrimary};
  }
`;

const IconsContainer = styled.div`
  display: flex;

  & > *:not(:last-child) {
    margin-right: ${(props) => props.theme.spacing[2]};
  }
`;
