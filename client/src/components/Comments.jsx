import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Comment from "./Comment";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

const NewComment = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const SortContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const SortSelect = styled.select`
  border: 1px solid ${({ theme }) => theme.soft};
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 5px;
  border-radius: 3px;
  cursor: pointer;
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [sortOrder, setSortOrder] = useState("newest");
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}?sort=${sortOrder}`);
        setComments(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchComments();
  }, [videoId, sortOrder]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment) return;

    try {
      if (!currentUser || !currentUser._id) {
        console.error("User ID is undefined");
        return;
      }

      const res = await axios.post("/comments", {
        userId: currentUser._id,
        videoId,
        desc: newComment,
      });
      setComments([res.data, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleCommentUpdate = (updatedComment) => {
    setComments((prev) => {
      const index = prev.findIndex((comment) => comment._id === updatedComment._id);
      if (index !== -1) {
        const updatedComments = [...prev];
        updatedComments[index] = updatedComment;
        return updatedComments;
      }
      return prev;
    });
  };

  const handleCommentDelete = (commentId) => {
    setComments((prev) => prev.filter((comment) => comment._id !== commentId));
  };

  return (
    <Container>
      {currentUser && (
        <NewComment onSubmit={handleCommentSubmit} aria-label="New Comment Form">
          <Avatar
            src={currentUser.img || "/default-avatar.png"}
            alt={`${currentUser.name}'s avatar`}
          />
          <Input
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            aria-label="New Comment Input"
          />
        </NewComment>
      )}
      <SortContainer>
        <SortSelect value={sortOrder} onChange={handleSortChange} aria-label="Sort Comments">
          <option value="top">Top comments</option>
          <option value="newest">Latest first</option>
        </SortSelect>
      </SortContainer>
      {comments.map((comment) => (
        <Comment
          key={comment._id}  // Ensure unique key
          comment={comment}
          onCommentUpdate={updatedComment => setComments(comments.map(c => c._id === updatedComment._id ? updatedComment : c))}
          onCommentDelete={deletedCommentId => setComments(comments.filter(c => c._id !== deletedCommentId))}
        />
      ))}
    </Container>
  );
};

export default Comments;
