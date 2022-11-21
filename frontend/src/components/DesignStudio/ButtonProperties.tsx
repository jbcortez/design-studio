import React, { useState } from "react";
import TextInput from "./TextInput";
import TextInputWithOptions from "./TextInputWithOptions";
import SelectInput from "./SelectInput";
import SliderInput from "./SliderInput";
import Tab from "./Tab";
import ShadowSelectMenu from "./ShadowSelectMenu";
import { shadows } from "../../enums";
import ColorPicker from "./ColorPicker";
import styled from "styled-components";
import useShowSidebar from "../../hooks/useShowSidebar";

const ButtonProperties = () => {
  const [buttonState, setButtonState] = useState("normal");
  const [shadow, setShadow] = useState({ key: "none", value: "none" });
  const showSidebar = useShowSidebar();

  return (
    <MenuContainer showSidebar={showSidebar} data-testid="button-properties">
      <Tab
        setButtonState={setButtonState}
        style={{ marginTop: "-2rem", marginBottom: "1rem" }}
      />
      <TextInput id="buttonLabel" label="Button Label" isRequired={true} />
      <TextInputWithOptions id="buttonLink" label="Button Link" />
      <ColorPicker
        params={{ buttonState }}
        testId="background-color-picker"
        label="Font Color"
        id="buttonFontColor"
      />

      <ColorPicker
        params={{ buttonState }}
        testId="background-color-picker"
        label="Background Color"
        id="buttonBackgroundColor"
      />
      <SelectInput
        params={{ buttonState }}
        label="Border Style"
        id="buttonBorderStyle"
        options={["none", "solid", "dashed"]}
      />
      <ColorPicker
        params={{ buttonState }}
        label="Border Color"
        testId="border-color-picker"
        id="buttonBorderColor"
      />
      <SliderInput
        params={{ buttonState }}
        label="Border Width"
        id="buttonBorderWidth"
        variant="block"
        max={10}
      />
      <SliderInput
        variant="block"
        params={{ buttonState }}
        label="Border Radius"
        id="buttonBorderRadius"
      />

      <ShadowSelectMenu
        id="buttonShadow"
        setVal={setShadow}
        val={shadow}
        label="Drop Shadow"
        options={shadows}
        buttonState={buttonState}
      />
    </MenuContainer>
  );
};

export default ButtonProperties;

const MenuContainer = styled.div.attrs<{ showSidebar: boolean }>((props) => ({
  style: {
    opacity: props.showSidebar ? "1" : "0",
  },
}))<{ showSidebar: boolean }>`
  margin: 0 auto;
  width: calc(35rem - 7.1rem);
  height: 100%;
  padding: 2rem;
  font-size: 1.2rem;
  overflow-y: auto;
  transition: opacity 150ms ease-in-out;

  & > *:not(:last-child) {
    margin-bottom: ${(props) => props.theme.spacing[4]};
  }
`;
