import React, { useState } from 'react';
import { IconButton, TextField, Grid } from '@material-ui/core';
import { Send as SendIcon } from '@material-ui/icons';
import CustomSnackbar from './components/SnackBar';

const CommentForm = ({ onSubmit }) => {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('')

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (author.trim() !== '' && text.trim() !== '') {
      onSubmit({ author, text });
      setAuthor('');
      setText('');
      setOpen(true)
      setMessage('Added Successfully!')
      setSeverity('success')
    }
    else {
      setOpen(true)
      setMessage('Please fill all the required fields!')
      setSeverity('error')
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item>
          <TextField label="Your Name" value={author} onChange={(e) => setAuthor(e.target.value)} fullWidth required/>
        </Grid>
        <Grid item xs={4}>
          <TextField label="Your Comment" value={text} onChange={(e) => setText(e.target.value)} fullWidth required/>
        </Grid>
        <Grid item>
          <IconButton type="submit" variant="contained" color="primary">
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={handleClose} />
    </form>
  );
};

export default CommentForm;