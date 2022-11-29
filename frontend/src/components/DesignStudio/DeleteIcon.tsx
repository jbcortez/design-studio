import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useAppDispatch } from "../../redux/reduxHooks";
import { clearBackgroundImage, removeElement } from "../../redux/elementSlice";
import { setCurrentComponent } from "../../redux/currentComponentSlice";
import { IconStyles } from "../../styles/util";
import useGetSelectedItems from "../../hooks/useGetSelectedItems";
import useCurrentComponent from "../../hooks/useCurrentComponent";
import { setActiveSidebarView } from "../../redux/sidebarViewSlice";

const DeleteIcon = () => {
  const dispatch = useAppDispatch();
  const currentComponent = useCurrentComponent();
  const selected = useGetSelectedItems();

  const handleClick = () => {
    if (currentComponent.type === "canvas") {
      dispatch(clearBackgroundImage({ undo: true }));
    } else {
      dispatch(removeElement({ selected }));

      if (currentComponent.type === "button") {
        dispatch(setActiveSidebarView({ id: 4 }));
      }

      dispatch(setCurrentComponent({ id: null, type: null }));
    }
  };

  return (
    <IconStyles onClick={handleClick} aria-label="Delete" title={"Delete"}>
      <DeleteOutlineIcon fontSize="large" />
    </IconStyles>
  );
};

export default DeleteIcon;
