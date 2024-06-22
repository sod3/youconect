// src/App.js
import { useEffect, useState } from "react";
import "./App.css";
import Video from "./component/Video";
import Navbar from "./component/Navbar";
import axios from "axios";

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/videos");
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  const handleNewVideo = (newVideo) => {
    setVideos((prevVideos) => [newVideo, ...prevVideos]);
  };

  return (
    <div className="App">
      <Navbar onNewVideo={handleNewVideo} />
      <div className="app_video">
        {videos.map((video) => (
          <Video key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default App;
