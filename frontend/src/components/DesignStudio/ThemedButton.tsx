import React from "react";
import PropTypes from "prop-types";
import useGetTheme from "../../hooks/useGetTheme";
import styled from "styled-components";
import useAddThemeButton from "../../hooks/useAddThemeButton";
import { Theme } from "../../types";

interface Props {
  type: string;
  children?: React.ReactNode;
}

const ThemedButton: React.FC<Props> = ({ type, children }) => {
  const theme = useGetTheme();
  const handleAddButton = useAddThemeButton();

  switch (type) {
    case "ThemeBtnOne":
      return (
        <ThemeBtnOne onClick={() => handleAddButton(1)} themeValues={theme}>
          {children}
        </ThemeBtnOne>
      );
    case "ThemeBtnTwo":
      return (
        <ThemeBtnTwo onClick={() => handleAddButton(2)} themeValues={theme}>
          Click Me
        </ThemeBtnTwo>
      );
    case "ThemeBtnThree":
      return (
        <ThemeBtnThree onClick={() => handleAddButton(3)} themeValues={theme}>
          Click Me
        </ThemeBtnThree>
      );
    case "ThemeBtnFour":
      return (
        <ThemeBtnFour onClick={() => handleAddButton(4)} themeValues={theme}>
          Click Me
        </ThemeBtnFour>
      );
    default:
      return <></>;
  }
};

ThemedButton.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ThemedButton;

const ThemeBtnOne = styled.button<{ themeValues: Theme }>`
  height: 4rem;
  width: 14.2rem;
  background: ${({ themeValues }) => {
    const col = themeValues.theme.find((val) => val.id === "color-5");
    if (col) return col.value;
  }};
  color: ${({ themeValues }) => {
    const col = themeValues.theme.find((val) => val.id === "color-1");
    if (col) return col.value;
  }};
  font-size: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid
    ${({ themeValues }) => {
      const col = themeValues.theme.find((val) => val.id === "color-5");
      if (col) return col.value;
    }};
  transition: all 200ms ease-in-out;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: ${({ themeValues }) => {
      const col = themeValues.theme.find((val) => val.id === "color-2");
      if (col) return col.value;
    }};
    color: ${({ themeValues }) => {
      const col = themeValues.theme.find((val) => val.id === "color-5");
      if (col) return col.value;
    }};
  }
`;

const ThemeBtnTwo = styled.button<{ themeValues: Theme }>`
  height: 4rem;
  width: 14.2rem;
  background: ${({ themeValues }) => {
    const col = themeValues.theme.find((val) => val.id === "color-2");
    if (col) return col.value;
  }};
  color: ${({ themeValues }) => {
    const col = themeValues.theme.find((val) => val.id === "color-5");
    if (col) return col.value;
  }};
  font-size: 1.6rem;
  font-weight: 300;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  user-select: none;
  border: none;

  &:hover {
    color: ${({ themeValues }) => {
      const col = themeValues.theme.find((val) => val.id === "color-4");
      if (col) return col.value;
    }};
  }
`;

const ThemeBtnThree = styled.button<{ themeValues: Theme }>`
  height: 4rem;
  width: 14.2rem;
  background: ${({ themeValues }) => {
    const col = themeValues.theme.find((val) => val.id === "color-2");
    if (col) return col.value;
  }};
  color: ${({ themeValues }) => {
    const col = themeValues.theme.find((val) => val.id === "color-8");
    if (col) return col.value;
  }};
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 200ms ease-in-out;
  border: 1px solid
    ${({ themeValues }) => {
      const col = themeValues.theme.find((val) => val.id === "color-8");
      if (col) return col.value;
    }};
  cursor: pointer;
  user-select: none;

  &:hover {
    color: ${({ themeValues }) => {
      const col = themeValues.theme.find((val) => val.id === "color-2");
      if (col) return col.value;
    }};
    background: ${({ themeValues }) => {
      const col = themeValues.theme.find((val) => val.id === "color-8");
      if (col) return col.value;
    }};
  }
`;

const ThemeBtnFour = styled.button<{ themeValues: Theme }>`
  height: 4rem;
  width: 14.2rem;
  background: ${({ themeValues }) => {
    const col = themeValues.theme.find((val) => val.id === "color-8");
    if (col) return col.value;
  }};
  color: ${({ themeValues }) => {
    const col = themeValues.theme.find((val) => val.id === "color-2");
    if (col) return col.value;
  }};
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 200ms ease-in-out;
  border: none;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: ${({ themeValues }) => {
      const col = themeValues.theme.find((val) => val.id === "color-7");
      if (col) return col.value;
    }};
  }
`;
