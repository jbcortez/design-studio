import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InputNumber, Slider } from "antd";
import { Cover } from "../../styles/util";
import useTargetElement from "../../hooks/useTargetElement";
import { useAppDispatch } from "../../redux/reduxHooks";
import { setBorderRadius } from "../../redux/elementSlice";
import InputBar from "./InputBar";
import useGetEditingMode from "../../hooks/useGetEditingMode";
import CropFreeIcon from "@mui/icons-material/CropFree";

interface Props {
  setShowBordersMenu: (
    value: boolean | ((prevVal: boolean) => boolean)
  ) => void;
}

const BordersMenu: React.FC<Props> = ({ setShowBordersMenu }) => {
  const [showInputBar, setShowInputBar] = useState<boolean>(false);
  const [value, setValue] = useState<number>(0);

  const editingMode = useGetEditingMode();
  const target = useTargetElement();

  const dispatch = useAppDispatch();

  const handleChange = (val: number, position?: string) => {
    if (target)
      dispatch(
        setBorderRadius({
          id: target.id,
          borderRadius: val,
          undo: false,
          position,
        })
      );
  };

  const handleChangeComplete = (val: number, position?: string) => {
    if (target)
      dispatch(
        setBorderRadius({
          id: target.id,
          borderRadius: val,
          undo: true,
          position,
        })
      );
  };

  useEffect(() => {
    if (target && target.type === "image" && editingMode) {
      switch (editingMode) {
        case "desktop":
          if (
            typeof target.style.desktop.borderTopLeftRadius?.value !==
            "undefined"
          )
            setValue(target.style.desktop.borderTopLeftRadius.value);
          break;

        case "mobile":
          if (
            typeof target.style.mobile.borderTopLeftRadius?.value !==
            "undefined"
          )
            setValue(target.style.mobile.borderTopLeftRadius.value);
          break;
        default:
          break;
      }
    }
  }, [target, editingMode]);

  return (
    <>
      <Cover onClick={() => setShowBordersMenu(false)} />
      <MenuContainer>
        <LabelContainer>
          <PrimaryLabel>Borders</PrimaryLabel>
        </LabelContainer>
        <div style={{ display: "flex", alignItems: "center" }}>
          <SecondaryLabel htmlFor="borderRadius">Radius</SecondaryLabel>
          <IconStyles
            active={showInputBar}
            onClick={() => setShowInputBar(!showInputBar)}
            style={{ padding: ".4rem", marginRight: "1.4rem" }}
          >
            <CropFreeIcon fontSize={"large"} />
          </IconStyles>
          <Slider
            id="borderRadius"
            value={showInputBar ? 0 : value}
            max={50}
            onChange={handleChange}
            onAfterChange={handleChangeComplete}
            aria-valuenow={value}
            disabled={showInputBar}
            style={{ width: "15rem", marginRight: "1.8rem" }}
          />
          <InputNumber
            id="borderRadius"
            max={50}
            value={showInputBar ? 0 : value}
            disabled={showInputBar}
            onChange={handleChangeComplete}
          />
        </div>
        {showInputBar && (
          <InputBar handleChangeComplete={handleChangeComplete} />
        )}
      </MenuContainer>
    </>
  );
};

export default BordersMenu;

const MenuContainer = styled.div`
  background: #fff;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadow[2]};
  position: absolute;
  top: 45px;
  left: 18px;
  padding: 2rem;
  width: 35rem;
  z-index: 100;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const PrimaryLabel = styled.p`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${(props) => props.theme.gray900};
  padding-right: 1rem;
  margin-bottom: 0;
`;

const SecondaryLabel = styled.label`
  font-size: 1.2rem;
  font-weight: 400;
  color: ${(props) => props.theme.gray900};
  padding-right: 2rem;
`;

const IconStyles = styled.button<{ active: boolean }>`
  transition: background-color 0.1s ease-in;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 0.5rem;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.active ? props.theme.color.gray200 : "#FFF"};
  &:hover {
    background-color: ${({ theme }) => theme.color.gray100};
  }
  &:active {
    background-color: ${({ theme }) => theme.color.gray200};
  }
`;
