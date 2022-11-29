import React from "react";
import { useTemplate } from "../../hooks/useTemplate";
import MenuButton from "./MenuButton";
import { PlusCircleOutlined } from "@ant-design/icons";
import { createCanvas } from "../../util/services/canvasServices";
import { NEW_CANVAS } from "../../enums";
import styled from "styled-components";
import { Title } from "../../styles/util";
import { templateList } from "../../templateEnums";
import TemplateItem from "./TemplateItem";

const TemplateMenu: React.FC = () => {
  const handleTemplate = useTemplate();

  const handleNewContent = async () => {
    await createCanvas(NEW_CANVAS);
  };

  return (
    <MenuContainer data-testid="template-menu">
      <ButtonContainer>
        <MenuButton
          fullWidth={true}
          label="Create New Design"
          variant={"secondary"}
          onClick={handleNewContent}
          icon={
            <PlusCircleOutlined
              style={{ fontSize: "16px", verticalAlign: "center" }}
            />
          }
        />
      </ButtonContainer>

      <Title>Templates</Title>
      <ButtonContainer>
        <MenuButton
          fullWidth={true}
          label="Blank Template"
          variant={"outline"}
          onClick={() => handleTemplate(0)}
          icon={
            <PlusCircleOutlined
              style={{ fontSize: "16px", verticalAlign: "center" }}
            />
          }
        />
      </ButtonContainer>
      {templateList &&
        templateList
          .sort((a, b) => Number(a.premium) - Number(b.premium))
          .map((item) => (
            <TemplateItem
              key={item.id}
              premium={item.premium}
              id={item.id}
              src={item.src}
              alt={item.alt}
            />
          ))}
    </MenuContainer>
  );
};

export default TemplateMenu;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: calc(35rem - 7.1rem);
  padding: 2rem;
  font-size: 1.2rem;
  overflow-y: auto;
`;

const ButtonContainer = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[4]};
`;
