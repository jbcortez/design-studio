import React from "react";

const styles: React.CSSProperties = {
  position: "absolute",
  top: 0,
  minWidth: "100%",
  minHeight: "100%",
  left: 0,

  zIndex: 0,
};

interface Props {
  color: string;
  id?: string;
}

const BackgroundColor: React.FC<Props> = ({ id, color }) => {
  return <div id={id} style={{ ...styles, background: color }}></div>;
};

export default BackgroundColor;
