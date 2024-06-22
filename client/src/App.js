import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import { useSelector } from "react-redux";
import Profile from "./components/Profile";
import Help from "./components/menu pages/Help";
import Feedback from "./components/menu pages/Feedback";
import History from "./components/menu pages/History";
import Upload from "./components/Upload";
import { ThreadsApp } from "./threads/src/main";
import { ShortsApp } from "./shorts/src/index";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 96px;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random" />} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/feedback" element={<Feedback />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/upload-video" element={<Upload />} />
                  <Route path="/shorts" element={<ShortsApp />} />
                  <Route path="/threadauth/*" element={<ThreadsApp />} />
                  <Route path="subscriptions" element={<Home type="sub" />} />
                  <Route path="search" element={<Search />} />
                  <Route path="/profile/:userId" element={<Profile />} />
                  <Route
                    path="signin"
                    element={currentUser ? <Home /> : <SignIn />}
                  />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
