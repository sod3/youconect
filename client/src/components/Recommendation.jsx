import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin-bottom: 10px;
`;
const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/tags?tags=${tags}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);

  return (
    <Container>
      <Title>Recommended Videos</Title>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;
