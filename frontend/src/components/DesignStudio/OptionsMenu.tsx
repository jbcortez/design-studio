import React, { useLayoutEffect, useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { useNavigate } from "react-router-dom";
import useGetContentList from "../../hooks/useGetContentList";
import {
  setContentList,
  setCurrentContent,
  setCurrentContentId,
} from "../../redux/contentSlice";
import { setActiveSidebarView } from "../../redux/sidebarViewSlice";
import {
  createContent,
  deleteContent,
  getAllContent,
} from "../../util/services/contentServices";
import { Content, Pos } from "../../types";
import { useAppDispatch } from "../../redux/reduxHooks";

interface Props {
  setShowOptionsMenu: (
    value: boolean | ((prevVar: boolean) => boolean)
  ) => void;
  contentId: string;
  titleRef?: React.RefObject<HTMLSpanElement>;
  pos: Pos;
  style?: React.CSSProperties;
}

const OptionsMenu: React.FC<Props> = ({
  setShowOptionsMenu,
  contentId,
  titleRef,
  pos,
  style,
}) => {
  const navigate = useNavigate();
  const contentList = useGetContentList();
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
    dispatch(setCurrentContentId({ id: contentId }));
    navigate(`/design?content-id=${contentId}`);
    dispatch(setActiveSidebarView({ id: 1 }));
  };

  const handleSetTitle = () => {
    setShowOptionsMenu(false);

    if (titleRef && titleRef.current) {
      titleRef.current.contentEditable = "true";
      titleRef.current.focus();
    }
  };

  const handleDuplicate = async () => {
    // copy target cta from ctaList
    setShowOptionsMenu(false);

    let targetContent = contentList.find((item) => item.id === contentId);

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
      await createContent(targetContent);
      result = await getAllContent();
    }

    if (result) {
      dispatch(setContentList({ contentList: result }));
    }
  };

  const handleDelete = async () => {
    let result;
    setShowOptionsMenu(false);

    await deleteContent(contentId);
    result = await getAllContent();

    if (result && result.length > 0) {
      dispatch(setContentList({ contentList: result }));
    } else {
      dispatch(setContentList({ contentList: [] }));
    }

    let min = 0;
    let lastUpdatedContent: Content | null = null;

    if (result) {
      for (let i = 0; i < result.length; i++) {
        if (result[i].updatedAt > min) {
          lastUpdatedContent = result[i];
          min = result[i].updatedAt;
        }
      }

      if (lastUpdatedContent?.id) {
        const content = contentList.find((item) => contentId === item.id);
        if (content) dispatch(setCurrentContent({ currentContent: content }));
        dispatch(setCurrentContentId({ id: lastUpdatedContent.id }));
        navigate(`/design?content-id=${lastUpdatedContent.id}`);
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
              handleSetTitle();
            }
          }}
          onClick={handleSetTitle}
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
