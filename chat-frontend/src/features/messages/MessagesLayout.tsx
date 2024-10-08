import React from 'react';
import { Grid2 } from '@mui/material';
import ChatUsers from './components/ChatUsers';
import { Message, OnlineUser } from '../../types';
import Chat from './components/Chat';

interface Props {
  messageUsers: OnlineUser[];
  usersFetching: boolean;
  messages: Message[];
  messagesFetching: boolean;
  onSubmit: (message: string) => void;
  messageCreating: boolean;
}

const MessagesLayout: React.FC<Props> = ({
  messageUsers,
  usersFetching,
  messages,
  messagesFetching,
  onSubmit,
  messageCreating,
}) => {
  return (
    <Grid2 container spacing={4} size={12}>
      <Grid2 size={3}>
        <ChatUsers messageUsers={messageUsers} usersFetching={usersFetching} />
      </Grid2>
      <Grid2 size={9}>
        <Chat
          messages={messages}
          messagesFetching={messagesFetching}
          onSubmit={onSubmit}
          messageCreating={messageCreating}
        />
      </Grid2>
    </Grid2>
  );
};

export default MessagesLayout;
