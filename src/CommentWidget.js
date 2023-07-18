import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import { v4 as uuid } from 'uuid';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { Typography } from '@material-ui/core';

const CommentWidget = () => {
  const [comments, setComments] = useState([]);

  const addComment = (comment, parentId = null) => {
    const newComment = { ...comment, id: uuid(), timestamp: Date.now(), replies: [] };
    if (parentId) {
      const updateReplies = (comments) => {
        return comments.map((c) => {
          if (c.id === parentId) {
            return { ...c, replies: [...c.replies, newComment] };
          }
          return { ...c, replies: updateReplies(c.replies) };
        });
      };
      setComments(updateReplies(comments));
    } else {
      setComments([...comments, newComment]);
    }
  };

  const updateComment = (id, newText) => {
    const updateText = (comments) => {
      return comments.map((c) => {
        if (c.id === id) {
          return { ...c, text: newText };
        }
        return { ...c, replies: updateText(c.replies) };
      });
    };
    setComments(updateText(comments));
  };

  const deleteComment = (id) => {
    const removeComment = (comments) => {
      return comments.filter((c) => c.id !== id).map((c) => ({
        ...c,
        replies: removeComment(c.replies),
      }));
    };
    setComments(removeComment(comments));
  };

  const handleReply = (parentId, reply) => {
    addComment(reply, parentId);
  };  
  
  return (
    <Container>
      <Typography  className='title' variant="h4">Comment Widget</Typography>
      <div>
        <CommentForm onSubmit={(comment) => addComment(comment)} />
      </div>
      <div>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onUpdate={updateComment}
            onDelete={deleteComment}
            onReply={handleReply}
          />
        ))}
      </div>
    </Container>
  );
};

export default CommentWidget

