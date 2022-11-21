import styled from "styled-components";

export const SectionHeader = styled.div`
  width: 100%;
  background: ${(props) => props.theme.color.settings.gray50};
  min-height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.color.settings.gray100};
`;

export const Text = styled.p`
  color: ${(props) => props.theme.color.settings.text};
  text-align: center;
`;

export const Section = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.spacing[5]};
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.color.gray300};
  cursor: pointer;

  &:hover {
    background: ${(props) => props.theme.color.settings.blue150};
  }
`;
