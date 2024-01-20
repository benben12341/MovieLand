import { Box, Typography, Fab, Tooltip } from '@mui/material';
import { useState } from 'react';
import MovieList from '../MovieList';
import ChatIcon from '@mui/icons-material/Chat';
import Chat from '../../components/Chat';
import { useSelector } from 'react-redux';

const Home = () => {
  const [isChatOpen, setChatOpen] = useState(false);
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const handleOpenChat = () => {
    setChatOpen(true);
  };

  const handleCloseChat = () => {
    setChatOpen(false);
  };

  return (
    <Box>
      <Typography variant={'h3'} sx={{ padding: '20px' }}>
        Movie List
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '20px'
        }}>
        <MovieList />
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Tooltip title='Open Movie Land Hub'>
          <Fab
            color='primary'
            onClick={handleOpenChat}
            disabled={!userInfo || !userInfo.id}
            sx={{
              backgroundColor: 'rgb(30, 153, 139)',
              position: 'fixed',
              bottom: 16,
              right: 16
            }}>
            <ChatIcon />
          </Fab>
        </Tooltip>
        {userInfo && userInfo.id && (
          <Chat isChatOpen={isChatOpen} handleCloseChat={handleCloseChat} />
        )}
      </Box>
    </Box>
  );
};

export default Home;
