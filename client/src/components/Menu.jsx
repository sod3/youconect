import React, { useEffect, useState } from "react";
import styled from "styled-components";
import YouConect from "../img/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import PlaylistPlayOutlinedIcon from "@mui/icons-material/PlaylistPlayOutlined";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubscriptions } from "../redux/userSlice";

const Container = styled.nav`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
  overflow-y: auto;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Wrapper = styled.div`
  padding: 18px 26px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }

  @media (max-width: 768px) {
    gap: 10px;
    justify-content: center;
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div`
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const SubscriptionsSection = styled.section`
  margin-top: 20px;
`;

const SubscriptionChannel = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 0;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ShowMoreButton = styled.button`
  padding: 5px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
`;

const Menu = ({ darkMode, setDarkMode }) => {
  const dispatch = useDispatch();
  const { currentUser, subscriptions = [] } = useSelector((state) => state.user);
  const [showAllSubscriptions, setShowAllSubscriptions] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.id) {
      dispatch(fetchSubscriptions(currentUser.id));
    }
  }, [dispatch, currentUser]);

  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={YouConect} alt="YouConect Logo" loading="lazy" />
            YouConect
          </Logo>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }} aria-label="Home">
          <Item>
            <HomeIcon />
            Home
          </Item>
        </Link>
        <Link to="/trends" style={{ textDecoration: "none", color: "inherit" }} aria-label="Explore">
          <Item>
            <ExploreOutlinedIcon />
            Explore
          </Item>
        </Link>
        <Link to="/subscriptions" style={{ textDecoration: "none", color: "inherit" }} aria-label="Subscriptions">
          <Item>
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </Item>
        </Link>
        <Hr />
        <Link to="/history" style={{ textDecoration: "none", color: "inherit" }} aria-label="History">
          <Item>
            <HistoryOutlinedIcon />
            History
          </Item>
        </Link>
        <Link to="/threadauth" style={{ textDecoration: "none", color: "inherit" }} aria-label="Threads">
          <Item>
            <HistoryOutlinedIcon />
            Threads
          </Item>
        </Link>
        <Link to="/shorts" style={{ textDecoration: "none", color: "inherit" }} aria-label="Shorts">
          <Item>
            <PlaylistPlayOutlinedIcon />
            Shorts
          </Item>
        </Link>
        <Link to="/feedback" style={{ textDecoration: "none", color: "inherit" }} aria-label="Send Feedback">
          <Item>
            <FeedbackOutlinedIcon />
            Send Feedback
          </Item>
        </Link>
        <Hr />
        {!currentUser && (
          <>
            <Login>
              Sign in to like videos, comment, and subscribe.
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <Button aria-label="Sign in">
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        )}
        {currentUser && (
          <SubscriptionsSection aria-label="Subscriptions Section">
            <Item>SUBSCRIPTION</Item>
            {subscriptions
              .slice(0, showAllSubscriptions ? subscriptions.length : 5)
              .map((channel) => (
                <SubscriptionChannel key={channel.id}>
                  <AccountCircleOutlinedIcon aria-label={channel.name} />
                  {channel.name}
                </SubscriptionChannel>
              ))}
            <ShowMoreButton
              onClick={() => setShowAllSubscriptions(!showAllSubscriptions)}
            >
              {showAllSubscriptions ? "Show Less" : "Show More"}
            </ShowMoreButton>
          </SubscriptionsSection>
        )}
        <Hr />
        <Link to="/settings" style={{ textDecoration: "none", color: "inherit" }} aria-label="Settings">
          <Item>
            <SettingsOutlinedIcon />
            Settings
          </Item>
        </Link>
        <Link to="/report" style={{ textDecoration: "none", color: "inherit" }} aria-label="Report">
          <Item>
            <FlagOutlinedIcon />
            Report
          </Item>
        </Link>
        <Link to="/help" style={{ textDecoration: "none", color: "inherit" }} aria-label="Help">
          <Item>
            <HelpOutlineOutlinedIcon />
            Help
          </Item>
        </Link>
        <Item onClick={() => setDarkMode(!darkMode)} aria-label="Toggle Dark Mode">
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
