import React, { useEffect, useState, useRef, useCallback } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 20px;
`;

const VideoGrid = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;

const IconWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  z-index: 999; /* Ensure the icon stays on top of other content */
`;

const Image = styled.img`
  width: 60px; /* Adjust the size of the image */
  height: 60px;
  border-radius: 50%; /* Make it circular */
  cursor: pointer;
  border: 3px solid gold; /* Add golden border */
  animation: rotateBorder 4s linear infinite; /* Apply rotation animation */
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  background-color: ${({ active }) => (active ? "#cc1a00" : "#f1f1f1")};
  color: ${({ active }) => (active ? "white" : "black")};
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0 5px;
  border-radius: 20px;
  &:hover {
    background-color: #cc1a00;
    color: white;
  }
`;

const Home = ({ setOpen }) => {
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const observer = useRef();

  const tags = ["All", "Money", "Music", "Gaming", "News", "Sports"];

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos?tags=${filter}&page=${page}`);
      const uniqueVideos = Array.from(new Set(res.data.map((v) => v._id))).map(
        (id) => res.data.find((v) => v._id === id),
      );
      setVideos((prev) => {
        const newVideos = [...prev, ...uniqueVideos];
        const uniqueNewVideos = Array.from(
          new Set(newVideos.map((v) => v._id)),
        ).map((id) => newVideos.find((v) => v._id === id));
        return uniqueNewVideos;
      });
    };
    fetchVideos();
  }, [filter, page]);


  const handleFilterChange = (tag) => {
    setFilter(tag.toLowerCase());
    setVideos([]);
    setPage(1);
  };

  const lastVideoElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>YouConect</title>
        <meta name="description" content="A platform to share and watch high-quality videos." />
        <meta name="keywords" content="video, sharing, online, earn money, entertainment" />
        <link rel="canonical" href="https://youconect.com/home" />
        <meta property="og:title" content="YouConect" />
        <meta property="og:description" content="A platform to share and watch high-quality videos." />
        <meta property="og:url" content="https://youconect.com/home" />
        <meta property="og:image" content="https://youconect.com/img/og-image.png" />
        </Helmet>
      <Container>
        <FilterContainer>
          {tags.map((tag) => (
            <FilterButton
              key={tag}
              active={filter === tag.toLowerCase()}
              onClick={() => handleFilterChange(tag)}
            >
              {tag}
            </FilterButton>
          ))}
        </FilterContainer>
        <VideoGrid>
          {videos.map((video, index) => (
            <Card
              key={video._id} // Ensure each key is unique
              video={video}
              ref={videos.length === index + 1 ? lastVideoElementRef : null}
            />
          ))}
        </VideoGrid>
      </Container>
      </HelmetProvider>
  );
};

export default Home;
