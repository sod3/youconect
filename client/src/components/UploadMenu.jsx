import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background-color: red;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const Item = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;

const UploadMenu = () => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate("/upload-video");
  };

  return (
    <Container>
      <Item onClick={handleUploadClick}>Upload Video</Item>
      <Item onClick={() => navigate("/upload-short")}>Upload Short</Item>
    </Container>
  );
};

export default UploadMenu;
