import React, { useState } from "react";
import styled from "styled-components";
import { TextField, Button, IconButton } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const Title = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const UploadContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  margin-top: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState("");

  const handleScreenshotUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setScreenshot(file);
      setScreenshotPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("feedback", feedback);
    if (screenshot) {
      formData.append("screenshot", screenshot);
    }
    try {
      const response = await axios.post(
        "http://localhost:8800/api/feedback",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("Feedback submitted:", response.data);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <Container>
      <Title>Send Feedback</Title>
      <Form onSubmit={handleSubmit}>
        <TextField
          label="Describe your feedback"
          multiline
          rows={4}
          variant="outlined"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />
        <UploadContainer>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUpload />}
          >
            Upload Screenshot
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleScreenshotUpload}
            />
          </Button>
          {screenshot && <span>{screenshot.name}</span>}
        </UploadContainer>
        {screenshotPreview && (
          <PreviewImage src={screenshotPreview} alt="Screenshot Preview" />
        )}
        <Button type="submit" variant="contained" color="primary">
          Submit Feedback
        </Button>
      </Form>
    </Container>
  );
};

export default Feedback;
