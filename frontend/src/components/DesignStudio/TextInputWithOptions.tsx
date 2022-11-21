import React, { useEffect, useState } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { setLink, setTypographyLink } from "../../redux/elementSlice";
import { useAppDispatch } from "../../redux/reduxHooks";
import useCurrentComponent from "../../hooks/useCurrentComponent";
import styled from "styled-components";
import { Input } from "antd";
import { Label } from "../../styles/util";
import useTargetElement from "../../hooks/useTargetElement";

interface Props {
  id: string;
  label: string;
  style?: React.CSSProperties;
}

const protocolRegEx =
  /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;

const TextInputWithOptions: React.FC<Props> = ({ id, label, style }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const currentComponent = useCurrentComponent();
  const target = useTargetElement();
  const dispatch = useAppDispatch();

  const validateUrl = () => {
    if (value.match(protocolRegEx)) {
      if (value.match(/mailto:/gi)) {
        return value;
      } else {
        // eslint-disable-next-line
        if (value.match(/https?:\/\//gi)) {
          return value;
        } else {
          return "https://" + value;
        }
      }
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    const validated = validateUrl();

    if (target && validated) {
      if (id === "typography-link") {
        dispatch(
          setTypographyLink({
            id: target.id,
            url: validated,
            options: checked,
          })
        );
      } else if (target.link && validated) {
        dispatch(
          setLink({
            id: target.id,
            link: { options: target.link.options, url: validated },
            undo: true,
          })
        );
      }
    }
  };

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setShowOptions(!showOptions);
  };

  const handleCheck: React.ChangeEventHandler<HTMLInputElement> = () => {
    if (target?.link && currentComponent.id)
      dispatch(
        setLink({
          id: currentComponent.id,
          link: {
            url: target.link.url,
            options: !checked ? "_blank" : "",
          },
          undo: true,
        })
      );

    setChecked(!checked);
  };

  const handleClose = () => {
    setShowOptions(false);
  };

  useEffect(() => {
    if (target?.link?.options === "_blank" || target?.link?.options) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [target]);

  useEffect(() => {
    if (target?.link) {
      setValue(target.link.url);
    }
  }, [target]);

  return (
    <InputContainer>
      <Label htmlFor={id}>{label}</Label>
      <InputFormat>
        <Input
          style={{ paddingRight: "30px", ...style }}
          id={id}
          value={value}
          status={
            value.length > 0 && !value.match(protocolRegEx)
              ? "error"
              : undefined
          }
          type={id === "typography-link" ? "url" : "text"}
          onChange={handleChange}
          onPressEnter={handleBlur}
          onBlur={handleBlur}
        />

        <IconContainer aria-label="More options" onClick={handleClick}>
          <SettingsOutlinedIcon style={{ color: "#fff", fontSize: "18" }} />
        </IconContainer>
      </InputFormat>
      {showOptions && (
        <>
          <Options>
            <Checkbox
              data-testid="target-blank-checkbox"
              type="checkbox"
              checked={checked}
              onChange={handleCheck}
              name={id + "Options"}
              id={id + "Options"}
            />
            <OptionsLabel htmlFor={id + "Options"}>
              Open in new tab
            </OptionsLabel>
            <Cover onClick={handleClose} />
          </Options>
        </>
      )}
    </InputContainer>
  );
};

export default TextInputWithOptions;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  position: relative;
`;

const OptionsLabel = styled.label`
  padding-left: 1.2rem;
`;

const InputFormat = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;

const IconContainer = styled.button`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 3rem;
  width: 2.6rem;
  border: none;
  border-radius: 0 2px 2px 0;
  background-color: ${({ theme }) => theme.color.btnPrimary};
  margin-left: -2.6rem;
  cursor: pointer;
  position: relative;
  z-index: 10;
`;

const Options = styled.div`
  background-color: #fff;
  position: absolute;
  top: 70px;
  right: 0;
  border-radius: 5px;
  z-index: 10;
  padding: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.shadow[2]};
`;

const Cover = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
`;

const Checkbox = styled.input``;
