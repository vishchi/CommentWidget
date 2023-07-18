import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, TextField  } from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon, Reply as ReplyIcon, Save as SaveIcon, Close as CloseIcon } from '@material-ui/icons';
import CommentForm from './CommentForm';
import CustomSnackbar from './components/SnackBar';

const Comment = ({ comment, onUpdate, onDelete, onReply }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('')

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleUpdate = () => {
    if(editedText.trim() !== '') {
      onUpdate(comment.id, editedText);
      setIsEditing(false);
      setOpen(true)
      setMessage('Message Updated Successfully!')
      setSeverity('success')
    }
    else {
      setOpen(true)
      setMessage(`Please don't leave the field empty!`)
      setSeverity('error')
    }
  };

  const handleDelete = () => {
    onDelete(comment.id);
  };

  const handleCommentSubmit = (commentData) => {
    const newComment = {
      author: commentData.author,
      text: commentData.text,
      timestamp: Date.now(),
      id: Math.floor(Math.random() * 1000),
      replies: [],
    };
    onReply(comment.id, newComment);
    setIsReplying(false);
  };

  return (
      <Card className='card'>
        <CardContent>
          <Typography variant="h6" sx={{fontWeight: 'bold'}}>{comment.author}</Typography>
          {isEditing ? (
            <TextField value={editedText} onChange={(e) => setEditedText(e.target.value)}/>
          ) : (
            <p className='comment-text'>{comment.text}</p>
          )}
          <Typography variant="caption">{new Date(comment.timestamp).toLocaleString()}</Typography>
          <div>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
            {isEditing ? (
              <IconButton onClick={handleUpdate}>
                  <SaveIcon />
              </IconButton>
            ) : (
              <IconButton onClick={() => setIsEditing(true)}>
                <EditIcon />
              </IconButton>
            )}
            <IconButton onClick={() => setIsReplying(!isReplying)}>
              {isReplying ? <CloseIcon /> : <ReplyIcon />}
            </IconButton>
          </div>
        </CardContent>
        <div className='reply-form'>
          {isReplying && <CommentForm onSubmit={handleCommentSubmit} />}
        </div>
        {comment.replies.map((reply) => (
          <div className='reply-comment'>
            <Comment key={reply.id} comment={reply} onUpdate={onUpdate} onDelete={onDelete} onReply={onReply} />
          </div>
        ))}
        <CustomSnackbar open={open} message={message} severity={severity} handleClose={handleClose} />
      </Card>
  );
};

export default Comment;