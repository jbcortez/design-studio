import React, { useEffect, useState } from "react";
import { disabled, disabledStyles, IconStyles } from "../../styles/util";
import FlipToFrontIcon from "@mui/icons-material/FlipToFront";
import { useAppDispatch } from "../../redux/reduxHooks";
import { incrementZIndex } from "../../redux/elementSlice";
import useElements from "../../hooks/useElements";
import useCurrentComponent from "../../hooks/useCurrentComponent";
import useTargetElement from "../../hooks/useTargetElement";

const SendLayerForwardIcon: React.FC = () => {
  const currentComponent = useCurrentComponent();
  const dispatch = useAppDispatch();
  const elements = useElements().present;
  const target = useTargetElement();
  const max = elements.length + 1;
  const [elZIndex, setElZIndex] = useState<number>(0);

  const handleClick = (e) => {
    e.stopPropagation();
    if (currentComponent.id)
      dispatch(incrementZIndex({ id: currentComponent.id, undo: true }));
  };

  useEffect(() => {
    if (target) {
      if (target.style.desktop.zIndex?.value) {
        setElZIndex(target.style.desktop.zIndex.value);
      }
    }
  }, [target]);

  return (
    <div style={elZIndex >= max ? disabledStyles : {}}>
      <IconStyles
        aria-label="Send forward a layer"
        title={"Send forward a layer"}
        onClick={handleClick}
        style={elZIndex >= max ? disabled : {}}
      >
        <FlipToFrontIcon fontSize="large" />
      </IconStyles>
    </div>
  );
};

export default SendLayerForwardIcon;
