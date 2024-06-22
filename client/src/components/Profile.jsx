import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./profile/profile.css";
import { useSelector } from "react-redux";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [profile, setProfile] = useState({
    avatar: "",
    channelName: "",
    description: "",
    videos: [],
  });
  const [editCover, setEditCover] = useState(false);
  const [newCover, setNewCover] = useState(null);

  useEffect(() => {
    if (!currentUser?.id) return;

    // Fetch profile data from API
    fetch(`/api/profile/${currentUser.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, [currentUser]);

  const handleSaveCover = () => {
    if (newCover) {
      const updatedProfile = {
        ...profile,
        cover: URL.createObjectURL(newCover),
      };
      setProfile(updatedProfile);
      setEditCover(false);
      // Upload the new cover image to the server here
    }
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <div
          className="profileCover"
          onMouseEnter={() => setEditCover(true)}
          onMouseLeave={() => setEditCover(false)}
        >
          <img
            className="profileCoverImg"
            src={
              profile.cover ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRztMYE6hsur2cwpH0r064-rZC1AOLFQTbrZA&s"
            }
            alt="Cover"
          />
          {editCover && (
            <div className="edit-option-cover">
              <input
                type="file"
                onChange={(e) => setNewCover(e.target.files[0])}
              />
              <button onClick={handleSaveCover}>Save</button>
            </div>
          )}
          <img
            src={profile.avatar || currentUser.img}
            alt="Avatar"
            className="profile-avatar"
          />
        </div>
        <div className="profileInfo">
          <h1 className="profileInfoName">
            {profile.channelName || currentUser.name}
          </h1>
          <span className="profileInfoDesc">
            {profile.description || "Your description"}
          </span>
        </div>
      </div>
      <div className="profile-videos">
        {profile.videos.map((video) => (
          <Card key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
