import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/reduxHooks";
import { setContent, setImageAlt } from "../../redux/elementSlice";
import { Input } from "antd";
import { InputContainer, Label } from "../../styles/util";
import useTargetElement from "../../hooks/useTargetElement";

interface Props {
  id: string;
  label: string;
  isRequired?: boolean;
  style?: React.CSSProperties;
}

const TextInput: React.FC<Props> = ({
  id,
  label,
  isRequired = false,
  style,
}) => {
  const target = useTargetElement();

  const [value, setValue] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (id === "alt-text" && target?.alt) {
      setValue(target.alt);
    } else {
      if (target && target.content) setValue(target.content);
    }
  }, [target, id]);

  const handleBlur = (e) => {
    if (target && id === "alt-text") {
      dispatch(setImageAlt({ undo: false, alt: value, id: target.id }));
    } else if (target) {
      dispatch(
        setContent({ id: target.id, content: e.target.value, undo: true })
      );
    }
  };

  return (
    <InputContainer data-testid="text-input">
      <Label htmlFor={id}>{label}</Label>
      <Input
        style={style}
        id={id}
        value={value}
        required={isRequired}
        onChange={handleChange}
        onPressEnter={handleBlur}
        onBlur={handleBlur}
      />
    </InputContainer>
  );
};

export default TextInput;
