import React from "react";
import styled from "styled-components";

const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  right: 30%;
  transform: translate(0, -50%);
`;

const Status = styled.span`
  font-size: 1.2rem;
  font-weight: 400;
  font-style: italic;
  color: #fff;
`;

interface Props {
  isUnsaved: boolean;
}

const SavedStatus: React.FC<Props> = ({ isUnsaved }) => {
  return (
    <StatusContainer data-testid="saved-status">
      <Status>{isUnsaved ? "Saving..." : "Saved"}</Status>
    </StatusContainer>
  );
};

export default SavedStatus;
