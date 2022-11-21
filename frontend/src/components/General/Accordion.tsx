import React, { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

interface Props {
  question: string;
  answer: string;
}

const Accordion: React.FC<Props> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  const [answerHeight, setAnswerHeight] = useState(0);
  const answerRef = useRef<HTMLDivElement | null>(null);
  const [bgColor, setBgColor] = useState<string>("#FFFFFF");

  useLayoutEffect(() => {
    if (answerRef.current) {
      setAnswerHeight(answerRef.current?.getBoundingClientRect().height);
    }
  }, [setAnswerHeight]);

  useLayoutEffect(() => {
    if (window.location.pathname.match(/design/gi)) {
      setBgColor("#FFFFFF");
    } else {
      setBgColor("#f5f5f5");
    }
  }, []);

  return (
    <Container>
      <QuestionContainer
        bgColor={bgColor}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") setOpen(!open);
        }}
        onClick={() => setOpen(!open)}
      >
        <Question>{question}</Question>
        <IconContainer>
          {!open && (
            <AddCircleOutlineIcon
              style={{ fontSize: "2.4rem", color: "inherit" }}
            />
          )}
          {open && (
            <RemoveCircleOutlineIcon
              style={{ fontSize: "2.4rem", color: "inherit" }}
            />
          )}
        </IconContainer>
      </QuestionContainer>
      <AnswerContainer height={answerHeight} open={open}>
        <Answer ref={answerRef}>{answer}</Answer>
      </AnswerContainer>
      <BottomBorder />
    </Container>
  );
};

export default Accordion;

const Container = styled.div`
  transition: height 250ms ease-in-out;
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  margin-bottom: ${(props) => props.theme.spacing[4]};
  width: 100%;

  @media screen and (min-width: 980px) {
    max-width: 98rem;
  }
`;

const QuestionContainer = styled.div<{ bgColor: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  background: ${(props) => props.bgColor};
  z-index: 1;
  color: ${(props) => props.theme.color.gray900};
  margin-bottom: ${(props) => props.theme.spacing[3]};
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.color.blue500};
  }
`;

const Question = styled.p`
  font-weight: bold;
  margin-bottom: 0;
  padding-right: ${(props) => props.theme.spacing[3]};
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnswerContainer = styled.div<{ open: boolean; height: number }>`
  // //padding-bottom: ${(props) => props.theme.spacing[6]};
  transition: height 250ms ease-in-out;
  // //margin-top: ${(props) => props.theme.spacing[2]};
  overflow: hidden;
  height: ${(props) => (props.open ? props.height + "px" : "0")};
`;

const Answer = styled.p`
  color: ${(props) => props.theme.color.gray700};
  margin-bottom: 0;
  font-weight: normal;
`;

const BottomBorder = styled.div`
  content: "";
  height: 1px;
  background: ${(props) => props.theme.color.gray200};
  margin-top: ${(props) => props.theme.spacing[4]};
`;
