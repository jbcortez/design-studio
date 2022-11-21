import React, { useState, useEffect } from "react";
import {
  setBorderWidth,
  setBorderRadius,
  setButtonBorderRadius,
  setButtonBorderWidth,
} from "../../redux/elementSlice";
import { useAppDispatch } from "../../redux/reduxHooks";
import styled from "styled-components";
import useTargetElement from "../../hooks/useTargetElement";
import useGetEditingMode from "../../hooks/useGetEditingMode";
import { Slider, InputNumber } from "antd";
import { Label } from "../../styles/util";
import { setZoom } from "../../redux/themeSlice";
import useZoom from "../../hooks/useZoom";

interface Props {
  id?: string;
  label?: string;
  min?: number;
  max?: number;
  params?: { buttonState: string };
  style?: React.CSSProperties;
  variant?: string;
}

const SliderInput: React.FC<Props> = ({
  id,
  label,
  min = 0,
  max = 100,
  params,
  style,
  variant,
}) => {
  const { buttonState } = params || {};
  const target = useTargetElement();
  const editingMode = useGetEditingMode();
  const zoom = useZoom();

  const [value, setValue] = useState<number>(0);

  const dispatch = useAppDispatch();

  const handleRedux = (undo: boolean, val: number) => {
    if (id === "zoomSlider") {
      dispatch(
        setZoom({
          zoom: val,
        })
      );
    }

    if (target) {
      switch (id) {
        case "borderWidth":
          dispatch(
            setBorderWidth({
              id: target.id,
              borderWidth: val,
              undo,
            })
          );
          break;
        case "borderRadius":
          dispatch(
            setBorderRadius({
              id: target.id,
              borderRadius: val,
              undo,
            })
          );
          break;
        case "buttonBorderWidth":
          if (buttonState)
            dispatch(
              setButtonBorderWidth({
                id: target.id,
                borderWidth: val,
                buttonState,
                undo,
              })
            );
          break;
        case "buttonBorderRadius":
          if (buttonState) {
            dispatch(
              setButtonBorderRadius({
                id: target.id,
                borderRadius: val,
                buttonState,
                undo,
              })
            );
          }

          break;

        default:
          return;
      }
    }
  };

  const handlePressEnter: React.KeyboardEventHandler<HTMLInputElement> = (
    e
  ) => {
    e.currentTarget.blur();
  };

  // Set input values when using undo/redo
  useEffect(() => {
    if (target) {
      let desktop = target.style.desktop;

      let mobile = target.style.mobile;

      switch (id) {
        case "borderWidth":
          switch (editingMode) {
            case "desktop":
              if (typeof desktop.borderWidth?.value !== "undefined") {
                setValue(desktop.borderWidth.value);
              }
              break;

            case "mobile":
              if (typeof mobile.borderWidth?.value !== "undefined") {
                setValue(mobile.borderWidth.value);
              }
              break;
            default:
              break;
          }
          break;
        case "borderRadius":
          if (typeof desktop.borderRadius?.value !== "undefined") {
            setValue(desktop.borderRadius.value);
          }
          break;
        case "buttonBorderWidth":
          if (
            buttonState === "normal" &&
            typeof desktop.borderWidth?.value !== "undefined"
          ) {
            setValue(desktop.borderWidth.value);
          } else if (
            buttonState === "hover" &&
            desktop.hover?.borderWidth?.value
          ) {
            setValue(desktop.hover.borderWidth.value);
          }
          break;
        case "buttonBorderRadius":
          if (
            buttonState === "normal" &&
            typeof desktop.borderRadius?.value !== "undefined"
          ) {
            setValue(desktop.borderRadius.value);
          } else if (
            buttonState === "hover" &&
            desktop.hover?.borderRadius?.value
          ) {
            setValue(desktop.hover.borderRadius.value);
          }
          break;
        default:
          break;
      }
    }
  }, [target, editingMode, id, buttonState]);

  // Initialize zoom value from redux
  useEffect(() => {
    if (id === "zoomSlider") {
      setValue(Math.round(zoom * 100));
    }
  }, [id, zoom]);

  const handleChangeComplete = (val: number) => {
    if (id !== "zoomSlider") {
      handleRedux(true, val);
    } else {
      handleRedux(false, val / 100);
    }
  };

  const handleChange = (val: number) => {
    setValue(val);

    if (id === "zoomSlider") {
      handleRedux(false, val / 100);
    }
  };

  return (
    <SliderContainer style={style} data-testid="slider">
      {label && variant === "block" && (
        <Label
          style={{
            marginBottom: "0",
            fontWeight: "400",
          }}
          htmlFor={id}
          className="label"
        >
          {label}
        </Label>
      )}
      <FormControl>
        {label && variant === "inline" && (
          <Label
            style={{
              marginBottom: "0",
              paddingRight: "1rem",
              fontWeight: "400",
            }}
            htmlFor={id}
            className="label"
          >
            {label}
          </Label>
        )}
        <Slider
          id={id}
          min={min}
          max={max}
          onChange={handleChange}
          onAfterChange={handleChangeComplete}
          value={value}
          style={{ width: "250px", marginRight: "14px" }}
        />
        <InputNumber
          id={id}
          min={min}
          max={max}
          onChange={handleChangeComplete}
          onPressEnter={handlePressEnter}
          value={value}
          style={{ position: "relative" }}
        />
      </FormControl>
    </SliderContainer>
  );
};

export default SliderInput;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  transition: all 150ms ease-in-out;
`;

const FormControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
