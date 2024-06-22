import React from "react";
import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 25px; /* Make the search bar rounded */
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  width: 100%;
`;

const Search = ({ query, setQuery }) => {
  const navigate = useNavigate();

  const handleVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      navigate(`/search?q=${transcript}`);
    };
    recognition.start();
  };

  return (
    <Container>
      <Input
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchOutlinedIcon onClick={() => navigate(`/search?q=${query}`)} />
      <MicOutlinedIcon onClick={handleVoiceSearch} />
    </Container>
  );
};

export default Search;
