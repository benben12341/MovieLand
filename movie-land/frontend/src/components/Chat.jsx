import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
  Typography,
  Container,
  Avatar,
  Grid,
  Box,
  IconButton
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';

const socket = io('https://localhost:443');

const Chat = ({ isChatOpen, handleCloseChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    console.log('load messages');
    async function fetchData() {
      const { data } = await axios.get(`/api/messages`);
      setMessages(data.messages);
    }
    fetchData();
  }, []);

  useEffect(() => {
    socket.on('update-messages', message => {
      console.log(message);
      setMessages([...messages, message]);
    });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      socket.emit('new-message', {
        text: newMessage,
        sender: userInfo.id,
        senderName: userInfo.name
      });
      setNewMessage('');
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents the default behavior of the Enter key (e.g., new line)
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isChatOpen} onClose={handleCloseChat} maxWidth='md' fullWidth>
      <DialogTitle>MovieLand Hub</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            height: '350px',
            overflowY: 'scroll !important',
            marginBottom: '10px'
          }}>
          <Paper
            elevation={3}
            style={{
              minHeight: '300px',
              maxHeight: '350px',
              padding: '10px',
              marginBottom: '10px',
              overflowY: 'scroll'
            }}>
            {messages?.map((message, index) => (
              <Grid
                key={index}
                container
                spacing={2}
                alignItems='center'
                width={'80% !important'}
                style={{
                  marginBottom: '10px',
                  paddingLeft: '10px'
                }}>
                <Grid item>
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <Box
                    bgcolor={
                      message.sender === userInfo.id
                        ? 'rgb(30, 153, 139)'
                        : '#bdbdbd'
                    }
                    p={2}
                    borderRadius={8}
                    style={{ position: 'relative' }}>
                    {/* Display sender's name above the message content */}
                    <Typography
                      variant='body1'
                      fontWeight={'bold'}
                      style={{
                        color:
                          message.sender === userInfo.id ? 'white' : 'black',
                        marginBottom: '4px'
                      }}>
                      {message.senderName}
                    </Typography>
                    <Typography
                      variant='body2'
                      style={{
                        color:
                          message.sender === userInfo.id ? 'white' : 'black'
                      }}>
                      {message.text}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            ))}
          </Paper>
        </Box>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <TextField
            label='Type your message'
            variant='outlined'
            fullWidth
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <IconButton color='primary' onClick={handleSendMessage}>
            <SendIcon />
          </IconButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Chat;
