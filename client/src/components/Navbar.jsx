import React, { useState } from "react";
import styled from "styled-components";
import YouConect from "../img/logo.png";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import UploadMenu from "./UploadMenu";
import UserMenu from "./UserMenu";
import Notifications from "./Notifications";
import Search from "./Search";
import { logout } from "../redux/userSlice";

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  z-index: 1000;  /* Ensure the navbar stays on top */
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Img = styled.img`
  height: 30px;
`;

const Logo = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 30px;
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const SearchContainer = styled.div`
  border-radius: 30px;
  width: 50%;
  position: relative;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>
              <Img src={YouConect} />
              YouConect
            </Logo>
          </Link>
        </Left>
        <SearchContainer>
          <Search query={query} setQuery={setQuery} />
        </SearchContainer>
        <Right>
          {currentUser ? (
            <>
              <VideoCallOutlinedIcon
                onClick={() => setUploadOpen(!uploadOpen)}
              />
              <NotificationsOutlinedIcon
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              />
              <div onClick={() => setUserMenuOpen(!userMenuOpen)}>
                <img
                  src={currentUser.img}
                  alt="avatar"
                  style={{ width: "32px", height: "32px", borderRadius: "50%" }}
                />
              </div>
              {userMenuOpen && <UserMenu handleLogout={handleLogout} />}
              {uploadOpen && <UploadMenu />}
              {notificationsOpen && <Notifications />}
            </>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
