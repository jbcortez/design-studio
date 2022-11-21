import React, { useEffect, useRef } from "react";

interface Props {
  font: { family: string };
  fontSize: number;
  handlePressEnter: React.KeyboardEventHandler;
  handleChange: React.MouseEventHandler<HTMLLIElement>;
  value: string;
}

const ListItem: React.FC<Props> = ({
  font,
  fontSize,
  handlePressEnter,
  handleChange,
  value,
}) => {
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (value === font.family && itemRef.current) {
      itemRef.current.scrollIntoView();
    }
  }, [value, font.family]);

  return (
    <li
      className={`font-picker-option ${font.family === value ? "active" : ""}`}
      ref={itemRef}
      style={{ fontSize: fontSize, fontFamily: font.family }}
      id={font.family}
      role="option"
      aria-selected={value === font.family}
      onKeyDown={handlePressEnter}
      onClick={handleChange}
      tabIndex={0}
    >
      {font.family}
    </li>
  );
};

export default ListItem;
