import React, { useEffect, useState } from "react";
import FormatLineSpacingIcon from "@mui/icons-material/FormatLineSpacing";
import { setLineHeight } from "../../redux/elementSlice";
import { useAppDispatch } from "../../redux/reduxHooks";
import styled from "styled-components";
import useTargetElement from "../../hooks/useTargetElement";
import useGetEditingMode from "../../hooks/useGetEditingMode";
import { InputNumber, Slider } from "antd";
import { Cover, Label } from "../../styles/util";

interface Props {
  id: string;
  label: string;
  max?: number;
  min?: number;
  responsiveMenu?: boolean;
}

const LineHeightInput: React.FC<Props> = ({
  id,
  label,
  max = 2,
  min = 0,
  responsiveMenu = false,
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);

  const target = useTargetElement();
  const editingMode = useGetEditingMode();

  const dispatch = useAppDispatch();

  const handleRedux = (undo: boolean, val: number) => {
    if (target) {
      switch (id) {
        case "lineHeight":
          if (val > max) {
            val = max;
          } else if (val < min) {
            val = min;
          }
          dispatch(
            setLineHeight({
              id: target.id,
              lineHeight: val,
              editingMode,
              undo,
            })
          );

          break;
        default:
          return;
      }
    }
  };

  // Set input values when using undo/redo
  useEffect(() => {
    if (target) {
      switch (editingMode) {
        case "desktop":
          if (typeof target.style.desktop.lineHeight?.value !== "undefined") {
            setValue(target.style.desktop.lineHeight.value);
          }

          break;

        case "mobile":
          if (typeof target.style.mobile.lineHeight?.value !== "undefined") {
            setValue(target.style.mobile.lineHeight.value);
          }
          break;
        default:
          break;
      }
    }
  }, [target, id, editingMode]);

  const handleChangeComplete = (val) => {
    handleRedux(true, val);
  };

  const handleChange = (val: number) => {
    setValue(val);
  };

  const handleNumChange = (val: number) => {
    setValue(val);
    handleRedux(true, val);
  };

  const handleBlur = (e) => {
    if (typeof e.target.value !== "undefined") {
      handleRedux(true, e.target.value);
    }
  };

  return (
    <LineHeightButton
      onClick={() => setShow(!show)}
      title={"Line Height"}
      aria-label="Line Height"
      show={show}
    >
      <FormatLineSpacingIcon fontSize="large" />
      {show && (
        <>
          <Cover data-testid="cover" onClick={() => setShow(false)} />
          <InputContainer
            data-testid="line-height-input"
            responsiveMenu={responsiveMenu}
          >
            <Label style={{ whiteSpace: "nowrap" }} htmlFor={id}>
              {label}
            </Label>
            <Flex>
              <Slider
                id={id}
                value={value}
                step={0.1}
                min={min}
                max={max}
                onChange={handleChange}
                onAfterChange={handleChangeComplete}
                style={{ width: "150px", marginRight: "1.4rem" }}
              />
              <InputNumber
                value={value}
                min={0}
                max={2}
                step={0.1}
                id={id}
                onBlur={handleBlur}
                onPressEnter={handleChangeComplete}
                onChange={handleNumChange}
                style={{ width: "60px" }}
              />
            </Flex>
          </InputContainer>
        </>
      )}
    </LineHeightButton>
  );
};

export default LineHeightInput;

const LineHeightButton = styled.button<{ show: boolean }>`
  -webkit-transition: background-color 0.1s ease-in-out;
  transition: background-color 0.1s ease-in-out;
  border-radius: 2px;
  padding: 0.6rem;
  cursor: pointer;
  position: relative;
  border: none;
  background-color: ${(props) =>
    props.show ? props.theme.color.gray200 : "#FFF"};

  &:hover {
    background-color: ${(props) =>
      props.show ? props.theme.color.gray200 : props.theme.color.gray100};
  }
`;

const InputContainer = styled.div<{ responsiveMenu: boolean }>`
  position: absolute;
  top: ${(props) => (props.responsiveMenu ? "9rem" : "4.5rem")};
  right: 0;
  padding: 2rem;
  border-radius: 3px;
  background: #fff;
  box-shadow: ${(props) => props.theme.shadow[2]};
  cursor: default;
  display: flex;
  flex-direction: column;
  z-index: 100;
`;

const Flex = styled.div`
  display: flex;
`;
