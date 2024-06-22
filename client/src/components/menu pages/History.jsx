import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Card from "../Card";
import { fetchHistory } from "../../redux/historySlice"; // Adjust the path as needed

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.text};
  margin-bottom: 20px;
`;

const VideoGrid = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;

const History = () => {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.history.videos);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(fetchHistory(currentUser.id));
    }
  }, [dispatch, currentUser]);

  if (!currentUser) {
    return (
      <Container>
        <Title>Please log in to view your history.</Title>
      </Container>
    );
  }

  return (
    <Container>
      <Title>History</Title>
      <VideoGrid>
        {history.map((video) => (
          <Card key={video._id} video={video} />
        ))}
      </VideoGrid>
    </Container>
  );
};

export default History;
