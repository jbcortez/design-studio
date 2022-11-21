import React from "react";
import styled from "styled-components";
import { Skeleton } from "antd";
import useLoading from "../../hooks/useLoading";

const SkeletonComponent = () => {
  const loading = useLoading();

  return (
    <Container>
      <Column>
        <Skeleton loading={loading} active />
        <Skeleton loading={loading} active />
        <Skeleton loading={loading} active />
      </Column>
    </Container>
  );
};

export default SkeletonComponent;

const Container = styled.div`
  width: 980px;
  height: 490px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing[8]};
`;

const Column = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
