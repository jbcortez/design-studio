import React, { useState, useEffect } from "react";
import { Select } from "antd";
import styled from "styled-components";
import { setCurrentCanvasId } from "../../redux/canvasSlice";
import { setActiveSidebarView } from "../../redux/sidebarViewSlice";
import { useAppDispatch } from "../../redux/reduxHooks";
import { useNavigate } from "react-router-dom";
import useCurrentCanvas from "../../hooks/useCurrentCanvas";
import useGetCanvasList from "../../hooks/useGetCanvasList";

const { Option } = Select;

interface Props {
  style?: React.CSSProperties;
}

const AnnouncementSelector: React.FC<Props> = ({ style }) => {
  const [value, setValue] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentContent = useCurrentCanvas();
  const contentList = useGetCanvasList();

  const handleChange = (value) => {
    dispatch(setCurrentCanvasId({ id: value }));
    navigate(`/design?content-id=${value}`);
    dispatch(setActiveSidebarView({ id: 1 }));
  };

  useEffect(() => {
    if (currentContent && currentContent.id) {
      setValue(currentContent.id);
    }
  }, [currentContent]);
  return (
    <SelectContainer style={style}>
      <Select
        placeholder="Select Announcement"
        style={{
          width: "235px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        onChange={handleChange}
        value={value}
      >
        {contentList.map((cta) => (
          <Option key={cta.id} value={cta.id}>
            {cta.title}
          </Option>
        ))}
      </Select>
    </SelectContainer>
  );
};

export default AnnouncementSelector;

const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
