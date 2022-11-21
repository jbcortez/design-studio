import React, { useEffect, useState } from "react";
import { disabled, disabledStyles, IconStyles } from "../../styles/util";
import FlipToBackIcon from "@mui/icons-material/FlipToBack";
import { useAppDispatch } from "../../redux/reduxHooks";
import { decrementZIndex } from "../../redux/elementSlice";
import useCurrentComponent from "../../hooks/useCurrentComponent";
import useTargetElement from "../../hooks/useTargetElement";

const SendLayerBackIcon: React.FC = () => {
  const currentComponent = useCurrentComponent();
  const dispatch = useAppDispatch();
  const min: number = 2;

  const target = useTargetElement();

  const [elZIndex, setElZIndex] = useState<number>(0);

  useEffect(() => {
    if (target) {
      if (typeof target.style.desktop.zIndex?.value !== "undefined") {
        setElZIndex(target.style.desktop.zIndex.value);
      }
    }
  }, [target]);

  const handleClick: React.MouseEventHandler = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (currentComponent.id) {
      dispatch(decrementZIndex({ id: currentComponent.id, undo: true }));
    }
  };

  return (
    <div style={elZIndex !== null && elZIndex <= min ? disabledStyles : {}}>
      <IconStyles
        aria-label="Send back a layer"
        title={"Send back a layer"}
        onClick={handleClick}
        style={elZIndex !== null && elZIndex <= min ? disabled : {}}
      >
        <FlipToBackIcon fontSize="large" />
      </IconStyles>
    </div>
  );
};

export default SendLayerBackIcon;
