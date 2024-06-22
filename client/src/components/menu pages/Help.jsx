import React, { useState } from "react";
import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const Title = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

const Question = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.text};
  padding: 10px;
  font-size: 25px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: gray;
  }
`;

const Answer = styled.div`
  background-color: ${({ theme }) => theme.text};
  padding: 10px;
  font-size: 20px;
  margin-top: 5px;
  border-radius: 5px;
  border-left: 3px solid ${({ theme }) => theme.primary};
`;

const questionsAndAnswers = [
  {
    question: "How to upload a video?",
    answer:
      "To upload a video, click on the 'Upload' button on the top right corner of the homepage. Then follow the instructions to select and upload your video.",
  },
  {
    question: "How to change my password?",
    answer:
      "Go to your account settings by clicking on your profile picture. In the 'Account' section, you can change your password.",
  },
  {
    question: "How to subscribe to a channel?",
    answer:
      "Visit the channel you want to subscribe to and click on the 'Subscribe' button below the channel name.",
  },
  {
    question: "How to report a video?",
    answer:
      "Click on the 'Report' button below the video player and select the reason for reporting the video.",
  },
  {
    question: "How to enable dark mode?",
    answer:
      "In the menu, click on the 'Dark Mode' option to toggle between light and dark modes.",
  },
];

const Help = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleQuestionClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container>
      <Title>Help & FAQ</Title>
      {questionsAndAnswers.map((qa, index) => (
        <div key={index}>
          <Question onClick={() => handleQuestionClick(index)}>
            <span>{qa.question}</span>
            {openIndex === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Question>
          {openIndex === index && <Answer>{qa.answer}</Answer>}
        </div>
      ))}
    </Container>
  );
};

export default Help;
