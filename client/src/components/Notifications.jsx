import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 300px;
`;

const NotificationItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: ${({ theme }) => theme.bgDark};
  }
`;

const Notifications = () => {
  const notifications = useSelector((state) => state.notifications.items);

  return (
    <Container>
      {notifications.map((notification, index) => (
        <NotificationItem key={index}>{notification}</NotificationItem>
      ))}
    </Container>
  );
};

export default Notifications;
