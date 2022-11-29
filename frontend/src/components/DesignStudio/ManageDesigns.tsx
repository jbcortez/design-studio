import styled from "styled-components";
import React from "react";
import ManageDesignsSelect from "./ManageDesignsSelect";

const ManageDesigns = () => {
  return (
    <Container>
      <Title>Manage Designs</Title>
      <ManageDesignsSelect />
    </Container>
  );
};

export default ManageDesigns;

const Container = styled.div`
  height: 100%;
  padding: 6rem;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 4rem;
  font-weight: bold;
  color: ${(props) => props.theme.color.primary};
`;
