import React, { useState, useEffect } from "react";
import { Select } from "antd";
import styled from "styled-components";
import { setCurrentContentId } from "../../redux/contentSlice";
import { setActiveSidebarView } from "../../redux/sidebarViewSlice";
import { useAppDispatch } from "../../redux/reduxHooks";
import { useNavigate } from "react-router-dom";
import useCurrentCta from "../../hooks/useCurrentContent";
import useGetContentList from "../../hooks/useGetContentList";

const { Option } = Select;

interface Props {
  style?: React.CSSProperties;
}

const AnnouncementSelector: React.FC<Props> = ({ style }) => {
  const [value, setValue] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentContent = useCurrentCta();
  const contentList = useGetContentList();

  const handleChange = (value) => {
    dispatch(setCurrentContentId({ id: value }));
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
