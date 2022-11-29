import React, { useEffect, useRef, useState } from "react";
import OptionsMenu from "./OptionsMenu";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styled from "styled-components";

const DesignSelectItem = ({ item, value, setValue }) => {
  const [mouseOver, setMouseOver] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const titleRef = useRef<null | HTMLInputElement>(null);

  const handleOpen = (id: string) => {
    setValue(id);
  };

  const handleSelect = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!showMenu) setValue(id);
  };

  const handlePressEnter: (e: React.KeyboardEvent, id: string) => void = (
    e: React.KeyboardEvent,
    id: string
  ) => {
    if (e.key === "Enter") {
      setValue(id);
    }
  };

  const handleMouseOver = (id) => {
    if (!showMenu) {
      setMouseOver(id);
    } else {
      setMouseOver(null);
    }
  };

  const handleOptionsClick = (e) => {
    setShowMenu(!showMenu);
    setMouseOver(null);
    setPos({ x: e.clientX, y: e.clientY });
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setEditTitle(false);
  };

  useEffect(() => {
    if (item.title) {
      setTitle(item.title);
    }
  }, [item]);

  useEffect(() => {
    if (editTitle && titleRef.current) {
      titleRef.current.focus();
      titleRef.current.select();
    }
  }, [editTitle]);

  return (
    <SelectItem
      role={"option"}
      aria-selected={value === item.id}
      onKeyDown={(e) => handlePressEnter(e, item.id)}
      active={value}
      id={item.id}
      onClick={(e) => handleSelect(e, item.id)}
      key={item.id}
      onDoubleClick={() => handleOpen(item.id)}
      tabIndex={0}
      onMouseOver={() => handleMouseOver(item.id)}
      onMouseLeave={() => setMouseOver(null)}
    >
      <TitleContainer>
        <Title
          value={title}
          disabled={!editTitle}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          ref={titleRef}
        />
        {!editTitle && (
          <TitleCover
            onClick={(e) => handleSelect(e, item.id)}
            onMouseOver={() => handleMouseOver(item.id)}
            onMouseLeave={() => setMouseOver(null)}
            onDoubleClick={() => handleOpen(item.id)}
          />
        )}
      </TitleContainer>

      <MenuContainer
        id={item.id}
        active={item.id === value}
        mouseOver={mouseOver}
      >
        {showMenu && (
          <OptionsMenu
            setShowOptionsMenu={setShowMenu}
            canvasId={item.id}
            pos={pos}
            setEditTitle={setEditTitle}
          />
        )}
        <IconContainer onClick={(e) => handleSelect(e, item.id)}>
          <EditIcon fontSize={"large"} style={{ color: "inherit" }} />
        </IconContainer>
        <IconContainer onClick={handleOptionsClick}>
          <MoreVertIcon fontSize={"large"} style={{ color: "inherit" }} />
        </IconContainer>
      </MenuContainer>
    </SelectItem>
  );
};

export default DesignSelectItem;

const SelectItem = styled.li<{ active: string | null; id: string }>`
  width: 100%;
  padding: ${(props) => props.theme.spacing[3]};
  font-size: 1.4rem;
  color: ${(props) => props.theme.color.text};
  cursor: pointer;
  background-color: ${(props) =>
    props.active === props.id
      ? props.theme.color.btnPrimaryLight
      : props.theme.color.white};
  display: flex;
  justify-content: space-between;

  &:hover {
    background-color: ${(props) =>
      props.active !== props.id
        ? props.theme.color.gray100
        : props.theme.color.btnPrimaryLight};
  }
`;

const Title = styled.input`
  margin-bottom: 0;
  border: none;
  color: ${(props) => props.theme.color.primary};
  background: transparent;
  outline: ${(props) => props.theme.color.primary};
`;

const MenuContainer = styled.div<{
  active: boolean;
  mouseOver: string | null;
  id: string;
}>`
  display: ${(props) =>
    props.active || props.mouseOver === props.id ? "flex" : "none"};

  & > *:not(:last-child) {
    margin-right: ${(props) => props.theme.spacing[3]};
  }
`;

const IconContainer = styled.div`
  color: ${(props) => props.theme.color.primary};
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: ${(props) => props.theme.color.blue600};
  }
`;

const TitleCover = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const TitleContainer = styled.div`
  position: relative;
`;
