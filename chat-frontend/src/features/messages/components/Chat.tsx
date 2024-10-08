import React, { useEffect, useRef } from 'react';
import { Message } from '../../../types';
import { CircularProgress, Grid2, Typography } from '@mui/material';
import ChatForm from './ChatForm';

interface Props {
  messages: Message[];
  messagesFetching: boolean;
  onSubmit: (message: string) => void;
  messageCreating: boolean;
}

const Chat: React.FC<Props> = ({ messages, messagesFetching, onSubmit, messageCreating }) => {
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <Grid2
      container
      direction="column"
      spacing={1}
      sx={{
        background: '#2D343D66',
        borderRadius: 4,
        padding: '30px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 8px 0px',
      }}
    >
      <Grid2 container direction="column" spacing={3}>
        <Grid2 component={Typography} variant="h5">
          Chat room
        </Grid2>
        <Grid2 ref={messagesContainerRef} container sx={{ height: '428px', overflow: 'auto' }}>
          {messagesFetching ? (
            <Grid2 container sx={{ justifyContent: 'center' }}>
              <CircularProgress />
            </Grid2>
          ) : (
            <Grid2 container direction="column" spacing={1} sx={{ marginTop: 'auto' }} size={12}>
              {messages.length > 0 ? (
                messages
                  .slice()
                  .reverse()
                  .map((message) => (
                    <Grid2 key={message._id} component={Typography}>
                      <b style={{ color: '#117aee' }}>{message.user.displayName} :</b> {message.text}
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
                  No messages yet
                </Typography>
              )}
            </Grid2>
          )}
        </Grid2>
      </Grid2>
      <Grid2>
        <ChatForm onSubmit={onSubmit} isLoading={messageCreating} />
      </Grid2>
    </Grid2>
  );
};

export default Chat;
