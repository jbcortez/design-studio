import React, { useLayoutEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useNavigate } from "react-router-dom";
import useGetCanvasList from "../../hooks/useGetCanvasList";
import {
  setCanvasList,
  setCurrentCanvas,
  setCurrentCanvasId,
} from "../../redux/canvasSlice";
import {
  setActiveSidebarView,
  setShowSidebar,
} from "../../redux/sidebarViewSlice";
import {
  createCanvas,
  deleteContent,
  getAllCanvas,
} from "../../util/services/canvasServices";
import { Canvas, Pos } from "../../types";
import { useAppDispatch } from "../../redux/reduxHooks";

interface Props {
  setShowOptionsMenu: (
    value: boolean | ((prevVar: boolean) => boolean)
  ) => void;
  canvasId: string;
  setEditTitle: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  pos: Pos;
  style?: React.CSSProperties;
}

const OptionsMenu: React.FC<Props> = ({
  setShowOptionsMenu,
  canvasId,
  pos,
  setEditTitle,
  style,
}) => {
  const navigate = useNavigate();
  const canvasList = useGetCanvasList();
  const [menuPosition, setMenuPosition] = useState<string>("");
  const [offsetWidth, setOffsetWidth] = useState<number>(0);
  const [offsetHeight, setOffsetHeight] = useState<number>(0);
  const deleteIconRef = useRef<SVGSVGElement>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleDeleteHover = () => {
    if (deleteIconRef.current) deleteIconRef.current.style.color = "#f3576d";
  };
  const handleDeleteLeave = () => {
    if (deleteIconRef.current)
      deleteIconRef.current.style.color = theme.color.gray600;
  };

  const dispatch = useAppDispatch();

  const handleEdit = () => {
    dispatch(setCurrentCanvasId({ id: canvasId }));
    navigate(`/design?content-id=${canvasId}`);
    dispatch(setActiveSidebarView({ id: 1 }));
    dispatch(setShowSidebar(true));
  };

  const handleRename = () => {
    setShowOptionsMenu(false);
    setEditTitle(true);
  };

  const handleDuplicate = async () => {
    // copy target cta from ctaList
    setShowOptionsMenu(false);

    let targetContent = canvasList.find((item) => item.id === canvasId);

    targetContent = JSON.parse(JSON.stringify(targetContent));

    if (targetContent) {
      // @ts-ignore - _id is not a valid property.
      targetContent._id = undefined;
      targetContent.id = "";

      // append (copy) to title
      targetContent.title = targetContent.title + "(copy)";
    }

    setShowOptionsMenu(false);
    let result;

    if (targetContent) {
      await createCanvas(targetContent);
      result = await getAllCanvas();
    }

    if (result) {
      dispatch(setCanvasList({ canvasList: result }));
    }
  };

  const handleDelete = async () => {
    let result;
    setShowOptionsMenu(false);

    await deleteContent(canvasId);
    result = await getAllCanvas();

    if (result && result.length > 0) {
      dispatch(setCanvasList({ canvasList: result }));
    } else {
      dispatch(setCanvasList({ canvasList: [] }));
    }

    let min = 0;
    let lastUpdatedCanvas: Canvas | null = null;

    if (result) {
      for (let i = 0; i < result.length; i++) {
        if (result[i].updatedAt > min) {
          lastUpdatedCanvas = result[i];
          min = result[i].updatedAt;
        }
      }

      if (lastUpdatedCanvas?.id) {
        const canvas = canvasList.find((item) => canvasId === item.id);
        if (canvas) dispatch(setCurrentCanvas({ currentCanvas: canvas }));
        dispatch(setCurrentCanvasId({ id: lastUpdatedCanvas.id }));
        navigate(`/design?content-id=${lastUpdatedCanvas.id}`);
      }
    }
  };

  useLayoutEffect(() => {
    if (
      menuRef.current &&
      pos.x + menuRef.current.offsetWidth > window.innerWidth
    ) {
      setMenuPosition("right");
    } else {
      setMenuPosition("left");
    }
  }, [pos.x]);

  useLayoutEffect(() => {
    if (
      menuRef.current &&
      pos.y + menuRef.current.offsetHeight > window.innerHeight
    ) {
      setMenuPosition("top");
    } else {
      setMenuPosition("bottom");
    }
  }, [pos.y]);

  useLayoutEffect(() => {
    if (menuRef.current) {
      setOffsetWidth(menuRef.current.offsetWidth);
      setOffsetHeight(menuRef.current.offsetHeight);
    }
  }, []);

  return (
    <ContextMenuStyles
      pos={pos}
      style={style}
      ref={menuRef}
      offsetWidth={offsetWidth}
      offsetHeight={offsetHeight}
      menuPosition={menuPosition}
      data-testid="options-menu"
    >
      <MenuItemsUpper>
        <MenuItem
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleEdit();
            }
          }}
          onClick={handleEdit}
        >
          <EditIcon
            style={{
              fontSize: 18,
              color: theme.color.gray600,
              marginRight: "1.2rem",
            }}
          />
          Edit
        </MenuItem>
        <MenuItem
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleRename();
            }
          }}
          onClick={handleRename}
        >
          <DriveFileRenameOutlineRoundedIcon
            style={{
              fontSize: 18,
              color: theme.color.gray600,
              marginRight: "1.2rem",
            }}
          />
          Rename
        </MenuItem>
        <MenuItem
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleDuplicate();
            }
          }}
          onClick={handleDuplicate}
        >
          <FileCopyIcon
            style={{
              fontSize: 18,
              color: theme.color.gray600,
              marginRight: "1.2rem",
            }}
          />
          Duplicate
        </MenuItem>
      </MenuItemsUpper>
      <MenuItemsLower>
        <MenuItem
          id="delete"
          onClick={handleDelete}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleDelete();
            }
          }}
          onMouseOver={handleDeleteHover}
          onMouseLeave={handleDeleteLeave}
        >
          <DeleteIcon
            ref={deleteIconRef}
            style={
              {
                fontSize: 18,
                marginRight: "1.2rem",
                color: theme.color.gray600,
              } as React.CSSProperties
            }
            id="deleteIcon"
          />
          Delete
        </MenuItem>
      </MenuItemsLower>
      <Cover
        data-testid="cover"
        onClick={() => setShowOptionsMenu(false)}
      ></Cover>
    </ContextMenuStyles>
  );
};

export default OptionsMenu;

const Cover = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
`;

const ContextMenuStyles = styled.div<{
  pos: Pos;
  menuPosition: string;
  offsetWidth: number;
  offsetHeight: number;
}>`
  height: fit-content;
  width: 16rem;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: ${(props) =>
    props.menuPosition === "bottom"
      ? props.pos.y + "px"
      : props.pos.y - props.offsetHeight + "px"};
  left: ${(props) =>
    props.menuPosition === "left"
      ? props.pos.x + "px"
      : props.pos.x - props.offsetWidth + "px"};
  background-color: ${(props) => props.theme.color.white};
  z-index: 1000;
  box-shadow: ${(props) => props.theme.shadow[2]};
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.color.gray100};
`;

const MenuItemsUpper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid #eeecec;
  margin-bottom: 0;

  & > :first-child {
    border-radius: 2px 2px 0 0;
  }
`;

const MenuItem = styled.li`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 1.5rem;
  border: none;
  color: ${(props) => props.theme.color.gray600};
  cursor: pointer;
  font-size: 1.4rem;

  &:hover {
    background-color: ${(props) =>
      props.id === "delete"
        ? props.theme.color.red100
        : props.theme.color.gray100};
    color: ${(props) =>
      props.id === "delete"
        ? props.theme.color.red500
        : props.theme.color.gray600};
  }

  & > * {
    margin-right: 1rem;
  }
`;

const MenuItemsLower = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 0;

  & > :last-child {
    border-radius: 0 0 5px 5px;
  }
`;
