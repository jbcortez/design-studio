import React from "react";
import { Title } from "../../styles/util";
import styled from "styled-components";
import ThemedButton from "./ThemedButton";
import TextIconButton from "./TextIconButton";
import {
  TextIconBtnEight,
  TextIconBtnFive,
  TextIconBtnFour,
  TextIconBtnOne,
  TextIconBtnSeven,
  TextIconBtnSix,
  TextIconBtnThree,
  TextIconBtnTwo,
} from "../../styles/ButtonEnums";

const ButtonMenu: React.FC = () => {
  return (
    <MenuContainer data-testid="button-menu">
      <Title>Buttons</Title>

      <Section>
        <SectionTitle>Themed Buttons</SectionTitle>
        <Row>
          <ThemedButton type={"ThemeBtnOne"}>Click Me</ThemedButton>
          <ThemedButton type={"ThemeBtnTwo"}>Click Me</ThemedButton>
        </Row>
        <Row>
          <ThemedButton type={"ThemeBtnThree"}>Click Me</ThemedButton>
          <ThemedButton type={"ThemeBtnFour"}>Click Me</ThemedButton>
        </Row>
      </Section>
      <Section>
        <SectionTitle>Text & Icon Buttons</SectionTitle>
        <Row>
          <TextIconButton type={1} style={TextIconBtnOne}>
            Click Me
          </TextIconButton>
          <TextIconButton type={2} style={TextIconBtnTwo}>
            Click Me
          </TextIconButton>
        </Row>
        <Row>
          <TextIconButton type={3} style={TextIconBtnThree}>
            Click Me
          </TextIconButton>
          <TextIconButton type={4} style={TextIconBtnFour}>
            Click Me
          </TextIconButton>
        </Row>
        <Row>
          <TextIconButton type={5} style={TextIconBtnFive}>
            Click Me
          </TextIconButton>
          <TextIconButton type={6} style={TextIconBtnSix}>
            Click Me
          </TextIconButton>
        </Row>
        <Row>
          <TextIconButton type={7} style={TextIconBtnSeven}>
            Click Me
          </TextIconButton>
          <TextIconButton type={8} style={TextIconBtnEight}>
            Click Me
          </TextIconButton>
        </Row>
      </Section>
    </MenuContainer>
  );
};

export default ButtonMenu;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2rem;
  font-size: 1.2rem;
  overflow-y: auto;
`;

const Section = styled.div`
  font-size: 1.4rem;
  color: ${(props) => props.theme.color.black};
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.p`
  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
  padding-bottom: 0.5rem;
  margin-bottom: 1.8rem;
`;

const Row = styled.div`
  display: flex;
  padding-bottom: 1.8rem;

  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`;
