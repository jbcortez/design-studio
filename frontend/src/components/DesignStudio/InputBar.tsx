import React, { useEffect, useState } from "react";
import { InputNumber } from "antd";
import styled from "styled-components";
import useGetElStyle from "../../hooks/useGetElStyle";

interface Props {
  handleChangeComplete: Function;
}

const InputBar: React.FC<Props> = ({ handleChangeComplete }) => {
  const [topLeft, setTopLeft] = useState<number>(0);
  const [topRight, setTopRight] = useState<number>(0);
  const [bottomRight, setBottomRight] = useState<number>(0);
  const [bottomLeft, setBottomLeft] = useState<number>(0);

  const elStyle = useGetElStyle();

  useEffect(() => {
    if (elStyle) {
      if (typeof elStyle.borderTopLeftRadius?.value !== "undefined") {
        setTopLeft(elStyle.borderTopLeftRadius.value);
      } else if (typeof elStyle.borderRadius?.value !== "undefined") {
        setTopLeft(elStyle.borderRadius.value);
      }

      if (typeof elStyle.borderTopRightRadius?.value !== "undefined") {
        setTopRight(elStyle.borderTopRightRadius.value);
      } else if (typeof elStyle.borderRadius?.value !== "undefined") {
        setTopRight(elStyle.borderRadius.value);
      }

      if (typeof elStyle.borderBottomLeftRadius?.value !== "undefined") {
        setBottomLeft(elStyle.borderBottomLeftRadius.value);
      } else if (typeof elStyle.borderRadius?.value !== "undefined") {
        setBottomLeft(elStyle.borderRadius.value);
      }

      if (typeof elStyle.borderBottomRightRadius?.value !== "undefined") {
        setBottomRight(elStyle.borderBottomRightRadius.value);
      } else if (typeof elStyle.borderRadius?.value !== "undefined") {
        setBottomRight(elStyle.borderRadius.value);
      }
    }
  }, [elStyle]);

  return (
    <InputBarStyles>
      <InputNumber
        value={topLeft}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleChangeComplete(topLeft, "topLeft");
        }}
        onChange={(val) => handleChangeComplete(val, "topLeft")}
        style={NumberInputBarStart}
      />
      <InputNumber
        value={topRight}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleChangeComplete(topRight, "topRight");
        }}
        onChange={(val) => handleChangeComplete(val, "topRight")}
        style={NumberInputBarInnerOne}
      />
      <InputNumber
        value={bottomRight}
        onKeyDown={(e) => {
          if (e.key === "Enter")
            handleChangeComplete(bottomRight, "bottomRight");
        }}
        onChange={(val) => handleChangeComplete(val, "bottomRight")}
        style={NumberInputBarInnerTwo}
      />
      <InputNumber
        value={bottomLeft}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleChangeComplete(bottomLeft, "bottomLeft");
        }}
        onChange={(val) => handleChangeComplete(val, "bottomLeft")}
        style={NumberInputBarEnd}
      />
    </InputBarStyles>
  );
};

export default InputBar;

const InputBarStyles = styled.div`
  display: flex;
  width: 100%;
  margin-top: 2rem;
`;

const NumberInputBarStart = {
  width: "25%",
  borderRadius: "3px 0 0 3px",
  borderRight: "0",
};

const NumberInputBarEnd = {
  width: "25%",
  borderRadius: "0 3px 3px 0",
};

const NumberInputBarInnerOne = {
  width: "25%",
  borderRight: "none",
  borderRadius: "0",
};

const NumberInputBarInnerTwo = {
  width: "25%",
  borderRight: "none",
  borderRadius: "0",
};
