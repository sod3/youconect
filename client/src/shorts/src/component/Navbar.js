import React, { useState } from "react";
import "./css/Navbar.css";
import UploadIcon from "@mui/icons-material/Upload";
import axios from "axios";

function Navbar({ onNewVideo }) {
  const [videoFile, setVideoFile] = useState(null);
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("channelName", channelName);
    formData.append("description", description);

    try {
      const response = await axios.post(
        "http://localhost:8800/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      onNewVideo(response.data);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div className="navbar">
      <h1>YouConect Shorts</h1>
      <div className="uploadSection">
        <input
          type="text"
          placeholder="Channel Name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="videoUpload" className="uploadLabel">
          <UploadIcon />
        </label>
        <input
          id="videoUpload"
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <button onClick={handleUpload} className="uploadButton">
          Upload Video
        </button>
      </div>
    </div>
  );
}

export default Navbar;
