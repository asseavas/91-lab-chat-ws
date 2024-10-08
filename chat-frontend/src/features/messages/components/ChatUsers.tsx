import React from 'react';
import { OnlineUser } from '../../../types';
import { CircularProgress, Grid2, Typography } from '@mui/material';

interface Props {
  messageUsers: OnlineUser[];
  usersFetching: boolean;
}

const ChatUsers: React.FC<Props> = ({ messageUsers, usersFetching }) => {
  return (
    <Grid2
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: '#2D343D66',
        borderRadius: 4,
        padding: '30px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 8px 0px',
      }}
    >
      <Grid2 component={Typography} variant="h5">
        Online users
      </Grid2>
      <Grid2 container sx={{ height: '515px', overflow: 'auto' }} size={12} textAlign="center">
        {usersFetching ? (
          <Grid2 container sx={{ justifyContent: 'center' }}>
            <CircularProgress />
          </Grid2>
        ) : (
          <Grid2 container sx={{ mt: 3 }} spacing={1} direction="column" size={12}>
            {messageUsers.length !== 0 ? (
              messageUsers.map((messageUser) => (
                <Grid2 key={messageUser._id} component={Typography} sx={{ fontSize: '18px' }}>
                  {messageUser.displayName}
                </Grid2>
              ))
            ) : (
              <Typography
                color="text.secondary"
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: 'auto',
                  marginBottom: 'auto',
                }}
              >
                No online users
              </Typography>
            )}
          </Grid2>
        )}
      </Grid2>
    </Grid2>
  );
};

export default ChatUsers;
