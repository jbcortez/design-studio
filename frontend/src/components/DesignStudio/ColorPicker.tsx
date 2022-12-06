import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChromePicker } from "react-color";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import CustomColorComponent from "./CustomColor";
import MenuButton from "./MenuButton";
import { Cover, Label } from "../../styles/util";
import {
  addCustomColor,
  getCustomColors,
} from "../../util/services/themeServices";
import { useDispatch } from "react-redux";
import {
  setBackgroundColor,
  setBorderColor,
  setButtonBackgroundColor,
  setButtonBorderColor,
  setButtonFontColor,
  setFontColor,
} from "../../redux/elementSlice";
import { setCustomColors } from "../../redux/themeSlice";
import useCurrentComponent from "../../hooks/useCurrentComponent";
import useTargetElement from "../../hooks/useTargetElement";
import useGetEditingMode from "../../hooks/useGetEditingMode";
import useGetCustomColors from "../../hooks/useGetCustomColors";
import useGetTheme from "../../hooks/useGetTheme";
import { Color, Style } from "../../types";
const tinyColor = require("tinycolor2");

interface Props {
  params?: { buttonState: string };
  id?: string;
  style?: React.CSSProperties;
  label?: string;
  testId?: string;
}

const ColorPicker: React.FC<Props> = ({ params, id, style, label, testId }) => {
  const target = useTargetElement();
  const currentComponent = useCurrentComponent();
  const customColors = useGetCustomColors();
  const colors = useGetTheme();
  const themeColors = colors.theme;
  const editingMode = useGetEditingMode();
  const { buttonState } = params || {};
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerY, setContainerY] = useState<number>(0);
  const [top, setTop] = useState<number>(70);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [showPopover, setShowPopover] = useState<boolean>(false);
  const [color, setColor] = useState<string>("rgb(255, 255, 255)");
  const [selectedColor, setSelectedColor] = useState<
    Color | { id: null; value: null }
  >({ id: null, value: null });

  const dispatch = useDispatch();

  const handleChange = ({ rgb }) => {
    if (currentComponent.id)
      switch (id) {
        case "background":
          dispatch(
            setBackgroundColor({
              id: currentComponent.id,
              color: tinyColor(rgb).toRgbString(),

              undo: false,
            })
          );
          break;
        case "buttonBackgroundColor":
          if (buttonState)
            dispatch(
              setButtonBackgroundColor({
                id: currentComponent.id,
                color: tinyColor(rgb).toRgbString(),
                undo: false,
                buttonState,
              })
            );
          break;
        case "fontColor":
          dispatch(
            setFontColor({
              id: currentComponent.id,
              color: tinyColor(rgb).toRgbString(),
              undo: false,
            })
          );
          break;
        case "buttonFontColor":
          if (buttonState)
            dispatch(
              setButtonFontColor({
                id: currentComponent.id,
                color: tinyColor(rgb).toRgbString(),
                undo: false,
                buttonState,
              })
            );
          break;
        case "borderColor":
          dispatch(
            setBorderColor({
              id: currentComponent.id,
              color: tinyColor(rgb).toRgbString(),
              undo: false,
            })
          );
          break;
        case "buttonBorderColor":
          if (buttonState)
            dispatch(
              setButtonBorderColor({
                id: currentComponent.id,
                color: tinyColor(rgb).toRgbString(),
                undo: false,
                buttonState,
              })
            );
          break;
        default:
          break;
      }
  };

  // Only calls redux after color is selected for a short period of time, or mouseUp
  const handleChangeComplete = ({ rgb }) => {
    if (currentComponent.id)
      switch (id) {
        case "background":
          dispatch(
            setBackgroundColor({
              id: currentComponent.id,
              color: tinyColor(rgb).toRgbString(),
              undo: true,
            })
          );
          break;
        case "buttonBackgroundColor":
          if (buttonState)
            dispatch(
              setButtonBackgroundColor({
                id: currentComponent.id,
                color: tinyColor(rgb).toRgbString(),
                undo: true,
                buttonState,
              })
            );
          break;
        case "fontColor":
          dispatch(
            setFontColor({
              id: currentComponent.id,
              color: tinyColor(rgb).toRgbString(),
              undo: true,
            })
          );
          break;
        case "buttonFontColor":
          if (buttonState)
            dispatch(
              setButtonFontColor({
                id: currentComponent.id,
                color: tinyColor(rgb).toRgbString(),
                undo: true,
                buttonState,
              })
            );
          break;
        case "borderColor":
          dispatch(
            setBorderColor({
              id: currentComponent.id,
              color: tinyColor(rgb).toRgbString(),
              undo: true,
            })
          );
          break;
        case "buttonBorderColor":
          if (buttonState)
            dispatch(
              setButtonBorderColor({
                id: currentComponent.id,
                color: tinyColor(rgb).toRgbString(),
                undo: true,
                buttonState,
              })
            );
          break;
        default:
          break;
      }
  };

  useEffect(() => {
    if (
      themeColors?.some(
        (col) => col.value === `#${tinyColor(color).toHex()}`.toUpperCase()
      )
    ) {
      let col: Color | undefined = themeColors.find(
        (col) => col.value === `#${tinyColor(color).toHex()}`.toUpperCase()
      );
      if (col) setSelectedColor(col);
    }
  }, [color, themeColors]);

  // Update color state when target or id changes
  useEffect(() => {
    if (target) {
      const buttonStyle = target.style.desktop as Style;
      const elementStyle = target.style.desktop as Style;
      switch (id) {
        case "background":
          if (elementStyle.background?.value) {
            setColor(tinyColor(elementStyle.background?.value).toRgb());
          } else {
            setColor("rgba(255,255,255, 1)");
          }
          break;

        case "buttonBackgroundColor":
          if (buttonState === "normal") {
            if (buttonStyle.background?.value) {
              setColor(tinyColor(buttonStyle.background.value).toRgb());
            } else {
              setColor("rgba(255,255,255, 1)");
            }
          } else if (buttonState === "hover") {
            if (buttonStyle.hover?.background?.value) {
              setColor(tinyColor(buttonStyle.hover.background.value).toRgb());
            } else {
              setColor("rgba(255,255,255, 1)");
            }
          }
          break;
        case "fontColor":
          if (elementStyle.color?.value) {
            setColor(tinyColor(elementStyle.color.value).toRgb());
          } else {
            setColor("rgba(255,255,255, 1)");
          }
          break;
        case "buttonFontColor":
          if (buttonState === "normal") {
            if (buttonStyle.color?.value) {
              setColor(tinyColor(buttonStyle.color.value).toRgb());
            } else {
              setColor("rgba(255,255,255, 1)");
            }
          } else if (buttonState === "hover") {
            if (buttonStyle.hover?.color?.value) {
              setColor(tinyColor(buttonStyle.hover.color.value).toRgb());
            } else {
              setColor("rgba(255,255,255, 1)");
            }
          }
          break;
        case "borderColor":
          if (elementStyle.borderColor?.value) {
            setColor(tinyColor(elementStyle.borderColor.value).toRgb());
          } else {
            setColor("rgba(255,255,255, 1)");
          }
          break;
        case "buttonBorderColor":
          if (buttonState === "normal") {
            if (buttonStyle.borderColor?.value) {
              setColor(tinyColor(buttonStyle.borderColor.value).toRgb());
            } else {
              setColor("rgba(255,255,255, 1)");
            }
          } else if (buttonState === "hover") {
            if (buttonStyle.hover?.borderColor?.value) {
              setColor(tinyColor(buttonStyle.hover.borderColor.value).toRgb());
            } else {
              setColor("rgba(255,255,255, 1)");
            }
          }
          break;
        default:
          break;
      }
    }
  }, [target, editingMode, id, buttonState]);

  const handleAddColor: React.MouseEventHandler<
    HTMLButtonElement
  > = async (): Promise<void> => {
    let colors;
    try {
      await addCustomColor(tinyColor(color).toRgbString());
    } catch (e) {
      console.error("Error adding custom color: ", e);
    }

    try {
      colors = await getCustomColors();
    } catch (e) {
      console.error("Error getting custom colors: ", e);
    }

    if (colors) {
      dispatch(setCustomColors({ customColors: colors }));
    }
    setShowPicker(false);
    setSelectedColor({ id: null, value: null });
  };

  const handleCustom = () => {
    setShowPicker(true);
  };

  const handleSelectColor = (color: Color | { id: null; value: null }) => {
    setSelectedColor(color);
    const rgb = tinyColor(color.value).toRgb();
    handleChangeComplete({ rgb });
  };

  useLayoutEffect(() => {
    if (containerRef.current) {
      setContainerY(containerRef.current.getBoundingClientRect().y);
    }
  }, []);

  useLayoutEffect(() => {
    const pickerHeight = 380;
    if (showPopover)
      if (window.innerHeight < containerY + 70 + pickerHeight) {
        const availableSpace = window.innerHeight - containerY;
        const offset = pickerHeight - availableSpace;

        setTop(-Math.abs(offset));
      } else if (label) {
        setTop(70);
      } else {
        setTop(40);
      }
  }, [id, label, containerY, showPopover]);

  return (
    <ColorPickerContainer ref={containerRef} data-testid={testId}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <PickerStyle
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") setShowPopover(!showPopover);
        }}
        showColorPicker={showPopover}
        data-testid="picker"
        aria-label={"Select a color"}
        title={"Select color"}
        background={tinyColor(color).toHexString()}
        onClick={() => setShowPopover(!showPopover)}
      />
      {showPopover && (
        <>
          <PopoverContainer
            ref={colorPickerRef}
            style={{ ...style }}
            top={top}
            label={label}
          >
            <ThemeSwatchContainer>
              <Title>Theme Colors</Title>
              <SwatchGrid>
                {themeColors?.map((color, i) => (
                  <ThemeColorStyles
                    id={color.id}
                    tabIndex={0}
                    key={`${color.id}-${i}`}
                    color={color.value}
                    selectedColor={selectedColor}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSelectColor(color);
                    }}
                    onClick={() => handleSelectColor(color)}
                  />
                ))}
              </SwatchGrid>
            </ThemeSwatchContainer>

            <CustomSwatchContainer>
              <Title>Custom Colors</Title>
              <CustomSwatchGrid>
                <CustomColorButton
                  aria-label={"Add custom color"}
                  title={"Add custom color"}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleCustom();
                  }}
                  onClick={handleCustom}
                >
                  <AddIcon />
                </CustomColorButton>
                {customColors?.map((item, i) => (
                  <CustomColorComponent
                    key={`${item.value}-${i}`}
                    id={item.id}
                    color={item.value}
                    onClick={() => handleSelectColor(item)}
                  />
                ))}
              </CustomSwatchGrid>
            </CustomSwatchContainer>

            <div
              style={{
                padding: "2rem",
                paddingTop: "0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ color: "blue", cursor: "pointer" }}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCustom();
                }}
                onClick={handleCustom}
              >
                + Choose color
              </div>
              {tinyColor(color).toHexString().toUpperCase()}
            </div>
            {showPicker && (
              <>
                <PickerContainer>
                  <ChromePicker
                    id={id}
                    name={id}
                    color={color}
                    onChange={handleChange}
                    onChangeComplete={handleChangeComplete}
                    className="chromepicker"
                  />
                  <FlexEnd>
                    <MenuButton
                      label={"Save"}
                      variant="secondary"
                      style={{ padding: ".5rem 1.2rem", fontSize: "1.2rem" }}
                      onClick={handleAddColor}
                    />
                  </FlexEnd>
                </PickerContainer>
                <Cover onClick={() => setShowPicker(false)} />
              </>
            )}
          </PopoverContainer>
          <Cover onClick={() => setShowPopover(false)} />
        </>
      )}
    </ColorPickerContainer>
  );
};

export default ColorPicker;

const PopoverContainer = styled.div<{
  label?: string;
  top: number;
}>`
  width: 250px;
  background: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  box-shadow: ${(props) => props.theme.shadow[2]};
  position: absolute;
  top: ${(props) => props.top}px;
  left: 0;
  z-index: 10;
  user-select: none;
`;

const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
`;

// const AlphaContainer = styled.div`
//   padding: 1rem 2rem;
// `;

const ThemeSwatchContainer = styled.div`
  padding: 2rem;
`;

const CustomSwatchContainer = styled.div`
  padding: 2rem;
  padding-top: 0.8rem;
`;

const SwatchGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 1rem;

  & > *:nth-child(5n + 5) {
    border-radius: 0 2px 2px 0;
  }

  & > *:nth-child(5n + 1) {
    border-radius: 2px 0 0 2px;
  }
`;

const CustomSwatchGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 0.6rem;
`;

const ThemeColorStyles = styled.div<{
  color: string;
  selectedColor: Color | { id: null };
}>`
  height: 20px;
  width: 20%;

  background: ${(props) => props.color};
  border: ${(props) =>
    props.color === "#FFFFFF" || props.color === "rgba(255, 255, 255, 1)"
      ? "1px solid #eee"
      : "1px solid transparent"};

  cursor: pointer;

  transform: ${(props) =>
    props.selectedColor.id === props.id ? "scaleY(1.2)" : ""};

  &:hover {
    transform: scaleY(1.2);
    box-shadow: ${(props) => props.theme.shadow[2]};
  }
`;

const Title = styled.span`
  margin-bottom: 0.8rem;
  display: block;
  font-size: 1.4rem;
  font-weight: 400;
`;

const CustomColorButton = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 100%;
  border: 3px solid white;
  background: ${(props) => props.theme.color.gray200};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    border-color: ${(props) => props.theme.color.btnPrimary};
  }
`;

const PickerContainer = styled.div`
  position: absolute;
  top: 36%;
  left: 0;
  z-index: 100;
  width: 200px;
  background: #fff;
  box-shadow: ${(props) => props.theme.shadow[2]};
`;

const ColorPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const PickerStyle = styled.div.attrs<{ background: string }>((props) => ({
  style: {
    background: props.background,
  },
}))<{ background: string; showColorPicker: boolean }>`
  height: 3.2rem;
  width: 3.2rem;
  border-radius: 3px;
  border: 1px solid ${({ theme }) => theme.color.gray300};
  cursor: pointer;

  outline: ${(props) =>
    props.showColorPicker ? `2px solid ${props.theme.color.btnPrimary}` : ""};
`;
