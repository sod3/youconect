import axios from "axios";
import React, { forwardRef, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { format } from "timeago.js";
import { FaDownload, FaFlag, FaShareAlt } from "react-icons/fa";
import Modal from "react-modal";
import { addVideoToHistory } from "../redux/historySlice";

const Container = styled.article`
  width: ${(props) => (props.type !== "sm" ? "360px" : "auto")};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => (props.type === "sm" ? "flex" : "block")};
  gap: 10px;
  position: relative;
  &:hover video {
    display: block;
  }
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
  display: block;
  position: relative;
`;

const VideoPreview = styled.video`
  display: none;
  width: ${(props) => (props.type === "sm" ? "auto" : "100%")};
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => (props.type !== "sm" ? "16px" : "0")};
  gap: 12px;
  flex: 1;
  position: relative;
  z-index: 2;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const MenuIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 2;
  font-size: 27px;
  color: black;
`;

const Menu = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: ${(props) => (props.open ? "block" : "none")};
  z-index: 10;
`;

const MenuItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const ShareContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ShareButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor || "#ccc"};
  color: white;
  font-size: 20px;
  text-decoration: none;
`;

const Card = forwardRef(({ type, video }, ref) => {
  const dispatch = useDispatch();
  const [channel, setChannel] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const videoRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(`/users/find/${video.userId}`);
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Handle play interruption if needed
      });
      timeoutRef.current = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
      }, 5000); // Play for 5 seconds
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  };

  const handleMenuToggle = (event) => {
    event.preventDefault();
    setMenuOpen((prev) => !prev);
  };

  const handleMenuItemClick = (action) => {
    console.log(action);
    if (action === "share") {
      setShareModalOpen(true);
    } else if (action === "download") {
      const link = document.createElement("a");
      link.href = video.videoUrl;
      link.download = `${video.title}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (action === "report") {
      setReportModalOpen(true);
    }
    setMenuOpen(false);
  };

  const handleReport = (reason) => {
    console.log(`Reported for: ${reason}`);
    setReportModalOpen(false);
  };

  const handleClick = async () => {
    try {
      // Call action creator to add video to history
      dispatch(addVideoToHistory(video));
    } catch (error) {
      console.error("Error adding video to history:", error);
    }
  };

  return (
    <Link
      to={`/video/${video._id}`}
      style={{ textDecoration: "none" }}
      onClick={handleClick}
    >
      <Container
        type={type}
        ref={ref}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image type={type} src={video.imgUrl} loading="lazy" alt={video.title} />
        <VideoPreview ref={videoRef} src={video.videoUrl} muted type={type} />
        <Details type={type}>
          <ChannelImage type={type} src={channel.img} alt={channel.name} />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>
              {video.views} views • {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
        <MenuIcon onClick={handleMenuToggle}>⋮</MenuIcon>
        <Menu open={menuOpen}>
          <MenuItem onClick={() => handleMenuItemClick("saveToPlaylist")}>
            Save to Playlist
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("share")}>
            <FaShareAlt /> Share
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("download")}>
            <FaDownload /> Download
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("report")}>
            <FaFlag /> Report
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("notInterested")}>
            Not Interested
          </MenuItem>
        </Menu>
      </Container>
      <Modal
        isOpen={reportModalOpen}
        onRequestClose={() => setReportModalOpen(false)}
      >
        <h2>Report Video</h2>
        <button onClick={() => handleReport("Abuse")}>Report Abuse</button>
        <button onClick={() => handleReport("Spam")}>Report Spam</button>
        <button onClick={() => handleReport("Inappropriate Content")}>
          Report Inappropriate Content
        </button>
        <button onClick={() => setReportModalOpen(false)}>Cancel</button>
      </Modal>
      <Modal
        isOpen={shareModalOpen}
        onRequestClose={() => setShareModalOpen(false)}
      >
        <h2>Share Video</h2>
        <ShareContainer>
          <ShareButton
            href={`https://wa.me/?text=${video.videoUrl}`}
            bgColor="#25D366"
          >
            <i className="fab fa-whatsapp"></i>
          </ShareButton>
          <ShareButton
            href={`https://www.facebook.com/sharer/sharer.php?u=${video.videoUrl}`}
            bgColor="#4267B2"
          >
            <i className="fab fa-facebook"></i>
          </ShareButton>
          <ShareButton
            href={`https://twitter.com/intent/tweet?url=${video.videoUrl}`}
            bgColor="#1DA1F2"
          >
            <i className="fab fa-twitter"></i>
          </ShareButton>
          <ShareButton
            href={`mailto:?subject=Check out this video&body=${video.videoUrl}`}
            bgColor="#D44638"
          >
            <i className="fas fa-envelope"></i>
          </ShareButton>
          <ShareButton href={video.videoUrl} bgColor="#000000">
            <i className="fas fa-link"></i>
          </ShareButton>
        </ShareContainer>
        <button onClick={() => setShareModalOpen(false)}>Close</button>
      </Modal>
      {/* JSON-LD structured data */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "${video.title}",
            "description": "${video.description || video.title}",
            "thumbnailUrl": "${video.imgUrl}",
            "uploadDate": "${new Date(video.createdAt).toISOString()}",
            "contentUrl": "${video.videoUrl}",
            "embedUrl": "${window.location.origin}/video/${video._id}",
            "author": {
              "@type": "Person",
              "name": "${channel.name}"
            },
            "publisher": {
              "@type": "Organization",
              "name": "${channel.name}",
              "logo": {
                "@type": "ImageObject",
                "url": "${channel.img}"
              }
            }
          }
        `}
      </script>
    </Link>
  );
});

export default Card;
