import React from "react";
import styled from "styled-components";
import useGetCanvasList from "../../hooks/useGetCanvasList";

interface Props {
  value: string | null;
  setValue: (
    value: string | null | ((prevVar: string | null) => string | null)
  ) => void;
  handleOpen?: () => void;
}

const Select: React.FC<Props> = ({ value, setValue, handleOpen }) => {
  const canvasList = useGetCanvasList();

  const handleSelect = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setValue(id);
  };

  const handlePressEnter: (e: React.KeyboardEvent, id: string) => void = (
    e: React.KeyboardEvent,
    id: string
  ) => {
    if (e.key === "Enter") {
      setValue(id);
    }
  };

  return (
    <SelectContainer
      role={"listbox"}
      aria-activedescendant={value as string}
      onClick={() => setValue(null)}
    >
      {canvasList &&
        canvasList.map((item) => {
          return (
            <SelectItem
              role={"option"}
              aria-selected={value === item.id}
              onKeyDown={(e) => handlePressEnter(e, item.id)}
              active={value}
              id={item.id}
              onClick={(e) => handleSelect(e, item.id)}
              key={item.id}
              onDoubleClick={handleOpen}
              tabIndex={0}
            >
              {item.title}
            </SelectItem>
          );
        })}
    </SelectContainer>
  );
};

export default Select;

const SelectContainer = styled.ul`
  height: 19rem;
  margin: 0 ${(props) => props.theme.spacing[6]};
  border: 1px solid ${(props) => props.theme.color.gray100};
  box-sizing: border-box;
  border-radius: 5px;
  list-style: none;
  overflow: auto;
`;

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

  &:hover {
    background-color: ${(props) =>
      props.active !== props.id
        ? props.theme.color.gray100
        : props.theme.color.btnPrimaryLight};
  }
`;
