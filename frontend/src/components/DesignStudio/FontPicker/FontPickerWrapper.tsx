import React, { useState, useEffect } from "react";
import { FontPicker } from "./FontPicker";
import { useAppDispatch } from "../../../redux/reduxHooks";
import { setFontFamily } from "../../../redux/elementSlice";
import useCurrentComponent from "../../../hooks/useCurrentComponent";
import useTargetElement from "../../../hooks/useTargetElement";

const FontPickerWrapper = () => {
  const [font, setFont] = useState("Roboto");
  const target = useTargetElement();
  const dispatch = useAppDispatch();
  const currentComponent = useCurrentComponent();

  useEffect(() => {
    if (target?.style.desktop.fontFamily?.value) {
      setFont(target.style.desktop.fontFamily.value);
    }
  }, [target]);

  const onChange = (font: string) => {
    setFont(font);
    if (currentComponent.id !== null)
      dispatch(setFontFamily({ id: currentComponent.id, font }));
  };

  return <FontPicker value={font} onChange={onChange} sort="alpha" />;
};

export default FontPickerWrapper;
