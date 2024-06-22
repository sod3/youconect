import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDown";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 30px 0px;
`;

const CommentWrapper = styled.div`
  display: flex;
  gap: 10px;
  position: relative;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;

const Name = styled.span`
  font-size: 14px;
  font-weight: 500;
  margin-right: 10px;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 12px;
`;

const ActionButton = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const ReplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
  margin-top: 10px;
`;

const MoreOptions = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 20px;
  right: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: ${({ show }) => (show ? "block" : "none")};
`;

const MenuItem = styled.div`
  padding: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Comment = ({ comment, onCommentUpdate, onCommentDelete }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [channel, setChannel] = useState({});
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState(comment.replies || []);
  const [likes, setLikes] = useState(comment.likes?.length || 0);
  const [dislikes, setDislikes] = useState(comment.dislikes?.length || 0);
  const [liked, setLiked] = useState(comment.likes?.includes(currentUser?._id));
  const [disliked, setDisliked] = useState(
    comment.dislikes?.includes(currentUser?._id),
  );
  const [isLikeDisabled, setIsLikeDisabled] = useState(false);
  const [isDislikeDisabled, setIsDislikeDisabled] = useState(false);
  const [editText, setEditText] = useState(comment.desc);
  const [isEditing, setIsEditing] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        if (comment.userId) {
          const res = await axios.get(`/users/find/${comment.userId}`);
          setChannel(res.data);
        } else {
          console.error("User ID is undefined");
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchChannel();
  }, [comment.userId]);

  const handleLike = async () => {
    setIsLikeDisabled(true);
    try {
      if (liked) {
        await axios.put(`/comments/unlike/${comment._id}`);
        setLikes((prev) => prev - 1);
      } else {
        await axios.put(`/comments/like/${comment._id}`);
        setLikes((prev) => prev + 1);
        if (disliked) {
          setDisliked(false);
          setDislikes((prev) => prev - 1);
        }
      }
      setLiked(!liked);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLikeDisabled(false);
    }
  };

  const handleDislike = async () => {
    setIsDislikeDisabled(true);
    try {
      if (disliked) {
        await axios.put(`/comments/undislike/${comment._id}`);
        setDislikes((prev) => prev - 1);
      } else {
        await axios.put(`/comments/dislike/${comment._id}`);
        setDislikes((prev) => prev + 1);
        if (liked) {
          setLiked(false);
          setLikes((prev) => prev - 1);
        }
      }
      setDisliked(!disliked);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDislikeDisabled(false);
    }
  };

  const handleReplySubmit = async () => {
    try {
      const res = await axios.post("/comments/reply", {
        desc: reply,
        commentId: comment._id,
        userId: currentUser._id,
      });
      const newReplies = [res.data, ...replies];
      setReplies(newReplies);
      setReply("");
      onCommentUpdate({ ...comment, replies: newReplies });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/comments/${comment._id}`);
      onCommentDelete(comment._id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`/comments/${comment._id}`, {
        desc: editText,
      });
      setIsEditing(false);
      onCommentUpdate({ ...comment, desc: editText });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <CommentWrapper>
        <Avatar src={channel.img} />
        <Details>
          <Name>
            {channel.name} <Date>1 day ago</Date>
          </Name>
          {isEditing ? (
            <Input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleEdit()}
            />
          ) : (
            <Text>{comment.desc}</Text>
          )}
          <Actions>
            <ActionButton onClick={handleLike} disabled={isLikeDisabled}>
              {liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />} {likes}
            </ActionButton>
            <ActionButton onClick={handleDislike} disabled={isDislikeDisabled}>
              {disliked ? <ThumbDownIcon /> : <ThumbDownOffAltOutlinedIcon />}{" "}
              {dislikes}
            </ActionButton>
            {currentUser && (
              <ActionButton onClick={() => setIsEditing((prev) => !prev)}>
                <ReplyOutlinedIcon />
              </ActionButton>
            )}
          </Actions>
        </Details>
        <MoreOptions onClick={() => setShowDropdown((prev) => !prev)}>
          <MoreVertIcon />
          <DropdownMenu show={showDropdown}>
            <MenuItem onClick={() => setIsEditing((prev) => !prev)}>
              Edit
            </MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </DropdownMenu>
        </MoreOptions>
      </CommentWrapper>
      <ReplyContainer>
        <Input
          placeholder="Add a reply..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleReplySubmit()}
        />
        {replies.map((reply) => (
          <Comment
            key={reply._id} // Ensure unique key for replies
            comment={reply}
            onCommentUpdate={(updatedReply) =>
              setReplies(replies.map((r) =>
                r._id === updatedReply._id ? updatedReply : r
              ))
            }
            onCommentDelete={(deletedReplyId) =>
              setReplies(replies.filter((r) => r._id !== deletedReplyId))
            }
          />
        ))}
      </ReplyContainer>
    </Container>
  );
};

export default Comment;
