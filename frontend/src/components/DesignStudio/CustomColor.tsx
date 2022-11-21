import React, { useState } from "react";
import styled from "styled-components";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import {
  deleteCustomColor,
  getCustomColors,
} from "../../util/services/themeServices";
import { setCustomColors } from "../../redux/themeSlice";
import { useAppDispatch } from "../../redux/reduxHooks";

interface Props {
  id: string;
  color: string;
  onClick: Function;
}

const CustomColor: React.FC<Props> = ({ id, color, onClick }) => {
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleDeleteColor = async (e: React.UIEvent, id: string) => {
    e.stopPropagation();
    if (id) {
      await deleteCustomColor(id);
      const colors = await getCustomColors();

      if (colors) dispatch(setCustomColors({ customColors: colors }));
    }
  };

  return (
    <CustomColorStyles
      onMouseOver={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
      onClick={onClick as React.MouseEventHandler}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick();
      }}
      aria-label={color}
      title={color}
      tabIndex={0}
      color={color}
      id={id}
    >
      {showDelete && (
        <DeleteIcon
          tabIndex={0}
          aria-label={"Delete color"}
          title={"Delete color"}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleDeleteColor(e, id);
          }}
          onClick={(e) => handleDeleteColor(e, id)}
        >
          <DoDisturbOnIcon style={{ color: "inherit" }} />
        </DeleteIcon>
      )}
    </CustomColorStyles>
  );
};

export default CustomColor;

const CustomColorStyles = styled.div<{
  color: string;
  id: string;
}>`
  height: 30px;
  width: 30px;
  border-radius: 100%;
  border: 3px solid white;
  background: ${(props) => props.color};
  position: relative;
  cursor: pointer;
  color: ${(props) => props.theme.color.red500};

  &:hover {
    border-color: ${(props) => props.theme.color.btnPrimary};
  }
`;

const DeleteIcon = styled.div`
  background: #fff;
  border-radius: 100%;
  position: absolute;
  top: -5px;
  left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
