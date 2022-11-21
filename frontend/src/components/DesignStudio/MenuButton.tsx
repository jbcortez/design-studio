import React, { useRef, useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

interface Props {
  label?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "primary" | "text" | "secondary" | "outline" | "danger";
  isDisabled?: boolean;
  style?: React.CSSProperties;
  id?: string;
  fullWidth?: boolean;
  pill?: boolean;
  icon?: any;
  active?: boolean;
  showWarningIcon?: boolean;
  type?: "submit";
}

const MenuButton: React.FC<Props> = ({
  label,
  onClick,
  variant = "primary",
  isDisabled = false,
  style,
  id,
  fullWidth,
  pill,
  icon,
  active,
  showWarningIcon,
  type,
}) => {
  const [showDisabledInfo, setShowDisabledInfo] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseOver = (e) => {
    if (showWarningIcon) {
      setShowDisabledInfo(true);
    }
  };
  const handleMouseLeave = () => {
    if (showWarningIcon) {
      setShowDisabledInfo(false);
    }
  };

  return (
    <Button
      type={type}
      id={id}
      ref={btnRef}
      hasLabel={!!label}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      fullWidth={fullWidth}
      style={style}
      onClick={isDisabled || !onClick ? () => {} : onClick}
      variant={variant}
      pill={pill}
      isDisabled={isDisabled}
      disabled={isDisabled || showWarningIcon}
      active={active}
    >
      {icon && <Icon hasLabel={!!label}>{icon}</Icon>}
      {label}
    </Button>
  );
};

export default MenuButton;

const Icon = styled.div<{ hasLabel: boolean }>`
  margin-right: ${(props) => (props.hasLabel ? "1rem" : "0")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button<{
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  variant: string | undefined;
  isDisabled?: boolean;
  style?: React.CSSProperties;
  id?: string;
  fullWidth?: boolean;
  pill?: boolean;
  icon?: any;
  active?: boolean;
  hasLabel: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.isDisabled
      ? props.theme.color.gray300
      : props.variant === "primary"
      ? theme.color.secondary
      : props.variant === "danger"
      ? props.theme.color.red500
      : props.variant === "text" && props.active
      ? props.theme.color.gray200
      : props.variant === "text" || props.variant === "outline"
      ? "transparent"
      : props.theme.color.btnPrimary};
  border-radius: ${(props) => (props.pill === true ? "25px" : "3px")};
  color: ${(props) =>
    props.isDisabled
      ? props.theme.color.gray800
      : props.variant === "primary"
      ? props.theme.color.black
      : props.variant === "secondary"
      ? "#FFF"
      : props.variant === "danger"
      ? "#FFF"
      : props.theme.color.black};
  cursor: ${(props) => (props.isDisabled ? "normal" : "pointer")};
  padding: ${(props) =>
    !props.hasLabel
      ? ".5rem"
      : props.pill === true
      ? "0.7rem 2.5rem"
      : "0.7rem 2rem"};
  pointer-events: auto;
  position: relative;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  white-space: nowrap;
  border: ${(props) =>
    props.variant === "outline"
      ? `1px solid ${props.theme.color.gray300}`
      : "none"};
  transition: all 0.3s ease-in-out;
  width: ${(props) => (props.fullWidth === true ? "100%" : "auto")};
  font-size: 1.4rem;
  box-shadow: ${(props) =>
    props.variant === "text" ? "0" : props.theme.shadow[2]};

  &:hover {
    background-color: ${(props) =>
      props.isDisabled
        ? props.theme.color.gray300
        : props.variant === "primary"
        ? props.theme.color.secondaryHover
        : props.variant === "danger"
        ? props.theme.color.red400
        : props.variant === "text" || props.variant === "outline"
        ? props.theme.color.gray100
        : props.theme.color.btnPrimaryHover};
    border: ${(props) =>
      props.variant === "outline"
        ? `1px solid ${props.theme.color.gray600}`
        : "none"};
  }
`;
