import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import LazyLoad from "react-lazyload";
import VideoJS from 'video.js'; // Import Video.js
import 'video.js/dist/video-js.css';
import PinturaEditor from 'pintura';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const Label = styled.label`
  font-size: 14px;
`;

const Upload = () => {
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const [videoPlayer, setVideoPlayer] = useState(null);
  const [editor, setEditor] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const res = await axios.post("/videos", { ...inputs, tags });
    res.status === 200 && navigate(`/video/${res.data._id}`);
  };

  useEffect(() => {
    if (video) {
      const player = VideoJS(video);
      setVideoPlayer(player);
    }

    return () => {
      if (videoPlayer) {
        videoPlayer.dispose();
      }
    };
  }, [video]);

  useEffect(() => {
    if (img) {
      const imgEditor = PinturaEditor.createDefaultEditor({
        src: img,
        enableWebcam: true,
      });
      setEditor(imgEditor);
    }

    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [img]);

  return (
    <>
      <Helmet>
        <title>Upload Video - YouConect</title>
        <meta name="description" content="Upload your video to YouConect, share it with the world and earn money." />
        <meta name="keywords" content="video, upload, sharing, earn money, high-quality, entertainment" />
        <link rel="canonical" href="https://youconect.com/upload" />
      </Helmet>
      <Container>
        <Wrapper>
          <Close onClick={() => navigate(-1)}>X</Close>
          <Title>Upload a New Video</Title>
          <Label>Video:</Label>
          {videoPerc > 0 ? (
            "Uploading:" + videoPerc + "%"
          ) : (
            <Input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          )}
          {video && (
            <div data-vjs-player>
              <video
                ref={(node) => (node ? setVideoPlayer(VideoJS(node)) : null)}
                className="video-js"
                controls
              />
            </div>
          )}
          <Input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
          <Desc
            placeholder="Description"
            name="desc"
            rows={8}
            onChange={handleChange}
          />
          <Input
            type="text"
            placeholder="Separate the tags with commas."
            onChange={handleTags}
          />
          <Label>Image:</Label>
          {imgPerc > 0 ? (
            "Uploading:" + imgPerc + "%"
          ) : (
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
            />
          )}
          {img && <div id="pintura-container"></div>}
          <Button onClick={handleUpload}>Upload</Button>
        </Wrapper>
      </Container>
    </>
  );
};

export default Upload;
