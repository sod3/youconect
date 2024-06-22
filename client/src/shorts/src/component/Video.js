import React, { useRef, useState, useEffect } from "react";
import "./css/Video.css";
import { Avatar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import NearMeIcon from "@mui/icons-material/NearMe";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Ticker from "react-ticker";
import axios from "axios";

function Video({ video }) {
  const [playing, setPlaying] = useState(false);
  const [subs, setSubs] = useState(false);
  const [stats, setStats] = useState({
    likes: video.likes,
    dislikes: video.dislikes,
    comments: video.comments,
    shares: video.shares,
  });
  const [showPauseIcon, setShowPauseIcon] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (videoRef.current) {
        videoRef.current.play().catch((error) => {
          console.log("Video play failed:", error);
        });
      }
      window.removeEventListener("click", handleUserInteraction);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (videoRef.current) {
            videoRef.current.play().catch((error) => {
              console.log("Video play failed:", error);
            });
          }
          setPlaying(true);
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
          }
          setPlaying(false);
        }
      },
      { threshold: 0.5 },
    );

    const currentVideoRef = videoRef.current;
    if (currentVideoRef) {
      observer.observe(currentVideoRef);
    }

    window.addEventListener("click", handleUserInteraction);

    return () => {
      if (currentVideoRef) {
        observer.unobserve(currentVideoRef);
      }
      window.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  const handleVideoPress = () => {
    if (playing) {
      setPlaying(false);
      videoRef.current.pause();
      setShowPauseIcon(true);
      setTimeout(() => setShowPauseIcon(false), 2000); // Hide the pause icon after 2 seconds
    } else {
      videoRef.current.play().catch((error) => {
        console.log("Video play failed:", error);
      });
      setPlaying(true);
    }
  };

  const handleSubscribe = async () => {
    setSubs((sub) => !sub);
    try {
      const response = await axios.patch(
        `http://localhost:8800/api/videos/${video._id}`,
        {
          subscribers: !subs ? video.subscribers + 1 : video.subscribers - 1,
        },
      );
      video.subscribers = response.data.subscribers;
    } catch (error) {
      console.error("Error updating subscription:", error);
    }
  };

  const handleStatUpdate = async (type) => {
    const newStats = { ...stats, [type]: stats[type] + 1 };
    setStats(newStats);

    try {
      await axios.patch(`http://localhost:8800/api/videos/${video._id}`, {
        [type]: newStats[type],
      });
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
    }
  };

  return (
    <div className="video">
      <video
        id={video._id}
        className="video__player"
        onClick={handleVideoPress}
        loop
        ref={videoRef}
        src={`http://localhost:8800/${video.url}`}
      />
      {showPauseIcon && <PlayArrowIcon className="pause-icon" />}
      <div className="shortsContainer">
        <div className="shortsVideoTop">
          <div className="shortsVideoTopIcon">
            <ArrowBackIcon />
          </div>
          <div className="shortsVideoTopIcon">
            <MoreVertIcon />
          </div>
        </div>
        <div className="shortsVideoSideIcons">
          <div
            className="shortsVideoSideIcon"
            onClick={() => handleStatUpdate("likes")}
          >
            <ThumbUpIcon />
            <p>{stats.likes}</p>
          </div>
          <div
            className="shortsVideoSideIcon"
            onClick={() => handleStatUpdate("dislikes")}
          >
            <ThumbDownIcon />
            <p>{stats.dislikes}</p>
          </div>
          <div
            className="shortsVideoSideIcon"
            onClick={() => handleStatUpdate("comments")}
          >
            <InsertCommentIcon />
            <p>{stats.comments}</p>
          </div>
          <div
            className="shortsVideoSideIcon"
            onClick={() => handleStatUpdate("shares")}
          >
            <NearMeIcon />
            <p>{stats.shares}</p>
          </div>
        </div>
        <div className="shortsBottom">
          <div className="shortsDesc">
            <Ticker mode="smooth">
              {({ index }) => (
                <>
                  <p className="description">{video.description}</p>
                </>
              )}
            </Ticker>
          </div>
          <div className="shortDetails">
            <Avatar />
            <p>{video.channelName}</p>
            <button
              style={{
                background: subs ? "red" : "hsla(0,0%,69.4%,.609)",
              }}
              onClick={handleSubscribe}
            >
              {subs ? "SUBSCRIBED" : "SUBSCRIBE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
