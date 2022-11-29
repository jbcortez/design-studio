import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useGetCanvasList from "../../hooks/useGetCanvasList";
import DesignSelectItem from "./DesignSelectItem";

const ManageDesignsSelect: React.FC = () => {
  const canvasList = useGetCanvasList();
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (canvasList && canvasList.length > 0 && value === "") {
      setValue(canvasList[0].id);
    }
  }, [canvasList, value]);

  return (
    <SelectContainer role={"listbox"} aria-activedescendant={value as string}>
      {canvasList &&
        canvasList.map((item) => (
          <DesignSelectItem
            item={item}
            value={value}
            setValue={setValue}
            key={item.id}
          />
        ))}
    </SelectContainer>
  );
};

export default ManageDesignsSelect;

const SelectContainer = styled.ul`
  border: 1px solid ${(props) => props.theme.color.gray100};
  box-sizing: border-box;
  border-radius: 5px;
  list-style: none;
  height: 100%;
  margin-bottom: 0;
`;
