import Select from "./Select";
import MenuButton from "./MenuButton";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SelectDesignView = ({ setView }) => {
  const [value, setValue] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleOpen = useCallback(() => {
    navigate(`/design?content-id=${value}`);
  }, [navigate, value]);

  return (
    <Container>
      <Header>
        <Headline>Select Design</Headline>
      </Header>
      <Select setValue={setValue} value={value} handleOpen={handleOpen} />
      <Footer>
        <MenuButton
          label={"Back"}
          variant={"text"}
          onClick={() => setView(0)}
        />
        <MenuButton label={"Open"} variant={"secondary"} onClick={handleOpen} />
      </Footer>
    </Container>
  );
};

export default SelectDesignView;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: ${(props) => props.theme.spacing[4]};
  padding-left: ${(props) => props.theme.spacing[6]};
`;

const Headline = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-right: ${(props) => props.theme.spacing[3]};
  margin-bottom: 0;
  line-height: 2.7rem;
`;

const Footer = styled.div`
  background-color: ${(props) => props.theme.color.gray100};
  border-radius: 0 0 5px 5px;
  width: 100%;
  margin-top: ${(props) => props.theme.spacing[5]};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: ${(props) => props.theme.spacing[4]};

  & > *:not(:last-child) {
    margin-right: ${(props) => props.theme.spacing[4]};
  }
`;
