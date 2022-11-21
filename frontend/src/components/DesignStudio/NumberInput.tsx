import React, { useState, useEffect, useCallback } from "react";
import { useAppDispatch } from "../../redux/reduxHooks";
import useCurrentComponent from "../../hooks/useCurrentComponent";
import { setFontSize } from "../../redux/elementSlice";
import useTargetElement from "../../hooks/useTargetElement";
import useGetEditingMode from "../../hooks/useGetEditingMode";
import { InputNumber } from "antd";

const NumberInput = ({ id, style }) => {
  const [value, setValue] = useState<number>(0);

  const currentComponent = useCurrentComponent();
  const target = useTargetElement();
  const editingMode = useGetEditingMode();
  const dispatch = useAppDispatch();

  const handleChange = (val) => {
    if (val && currentComponent.id) {
      dispatch(
        setFontSize({
          id: currentComponent.id,
          editingMode,
          fontSize: parseInt(val),
          undo: false,
        })
      );
    }
  };

  const handleDispatch = useCallback(
    (e) => {
      if (
        e.target.value &&
        e.target.value !== 0 &&
        !isNaN(e.target.value) &&
        currentComponent.id
      ) {
        dispatch(
          setFontSize({
            id: currentComponent.id,
            editingMode,
            fontSize: parseInt(e.target.value),
            undo: true,
          })
        );
      } else if (target) {
        // If user types something other than a valid value into the input, reinitialize value with current font size
        switch (editingMode) {
          case "desktop":
            if (target.style.desktop.fontSize) {
              if (typeof target.style.desktop.fontSize !== "number") {
                setValue(target.style.desktop.fontSize.value);
              } else if (typeof target.style.desktop.fontSize === "number") {
                setValue(target.style.desktop.fontSize);
              }
            }
            break;

          case "mobile":
            if (target.style.mobile.fontSize) {
              if (typeof target.style.mobile.fontSize !== "number") {
                setValue(target.style.mobile.fontSize.value);
              } else if (typeof target.style.mobile.fontSize === "number") {
                setValue(target.style.mobile.fontSize);
              }
            }
            break;
          default:
            break;
        }
      }
    },
    [dispatch, currentComponent, editingMode, target]
  );

  // Set input values when using undo/redo
  useEffect(() => {
    if (target) {
      switch (editingMode) {
        case "desktop":
          if (target.style.desktop.fontSize) {
            if (typeof target.style.desktop.fontSize !== "number") {
              setValue(target.style.desktop.fontSize.value);
            } else if (typeof target.style.desktop.fontSize === "number") {
              setValue(target.style.desktop.fontSize);
            }
          }
          break;

        case "mobile":
          if (target.style.mobile.fontSize) {
            if (typeof target.style.mobile.fontSize !== "number") {
              setValue(target.style.mobile.fontSize.value);
            } else if (typeof target.style.mobile.fontSize === "number") {
              setValue(target.style.mobile.fontSize);
            }
          }
          break;
        default:
          break;
      }
    }
  }, [target, editingMode, id]);

  return (
    <>
      <InputNumber
        style={style}
        id={id}
        aria-label="Font Size"
        title={"Font size"}
        value={value}
        onChange={handleChange}
        onPressEnter={handleDispatch}
      />
    </>
  );
};

export default NumberInput;
