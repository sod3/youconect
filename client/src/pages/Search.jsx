import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import { Helmet } from "react-helmet";
import LazyLoad from "react-lazyload";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/videos/search${query}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);

  return (
    <>
      <Helmet>
        <title>Search Results - YouConect</title>
        <meta name="description" content="Find the best videos on our platform based on your search query." />
        <meta name="keywords" content="video, search, platform, high-quality, entertainment" />
        <link rel="canonical" href={`https://youconect.com/search${query}`} />
      </Helmet>
      <Container>
        {videos.map((video) => (
          <LazyLoad key={video._id} height={200} offset={100}>
            <Card video={video} />
          </LazyLoad>
        ))}
      </Container>
    </>
  );
};

export default Search;
