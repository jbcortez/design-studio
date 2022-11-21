import { Alert, Button, Tooltip } from "antd";
import React from "react";

interface Props {
  message: string;
  type: "warning" | "error" | "success" | "info";
  onClick: React.MouseEventHandler<HTMLElement>;
  btnLabel?: string;
  showIcon?: boolean;
  style?: React.CSSProperties;
}

const CustomAlert: React.FC<Props> = ({
  message,
  type,
  onClick,
  btnLabel,
  showIcon,
  style,
}) => {
  return (
    <Alert
      message={message}
      showIcon={showIcon}
      type={type}
      style={style}
      closeIcon={
        btnLabel && (
          <Tooltip
            placement="bottomLeft"
            title={
              "Your Evergreen Campaign will display on your site between scheduled content."
            }
          >
            <Button onClick={onClick} size="small" type="ghost">
              {btnLabel}
            </Button>
          </Tooltip>
        )
      }
      closable
    />
  );
};

export default CustomAlert;
