import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

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

const UserMenu = ({ handleLogout }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <Link
        to="/dashboard"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Item>View Your Channel</Item>
      </Link>
      <Item onClick={() => navigate("/switch-account")}>Switch Account</Item>
      <Item onClick={handleLogout}>Sign Out</Item>
    </Container>
  );
};

export default UserMenu;
