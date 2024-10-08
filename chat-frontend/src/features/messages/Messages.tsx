import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  addMessage,
  selectMessageCreating,
  selectMessages,
  selectMessagesFetching,
  setMessages,
} from './messagesSlice';
import { selectUser } from '../users/usersSlice';
import MessagesLayout from './MessagesLayout';
import { Grid2 } from '@mui/material';
import { OnlineUser } from '../../types';

const Messages = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(selectMessages);
  const isCreating = useAppSelector(selectMessageCreating);
  const messagesFetching = useAppSelector(selectMessagesFetching);
  const user = useAppSelector(selectUser);
  const token = user?.token;
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

  const ws = useRef<WebSocket | null>(null);

  const connectWebSocket = useCallback(() => {
    ws.current = new WebSocket('ws://localhost:8000/chat');

    ws.current.onopen = () => {
      console.log('WebSocket connected');

      if (token && ws.current) {
        ws.current.send(
          JSON.stringify({
            type: 'LOGIN',
            payload: token,
          }),
        );
      }
    };

    ws.current.onmessage = (event) => {
      const decodedMessage = JSON.parse(event.data);

      if (decodedMessage.type === 'ONLINE_USERS') {
        setOnlineUsers(decodedMessage.payload);
      }

      if (decodedMessage.type === 'LAST_MESSAGES') {
        dispatch(setMessages(decodedMessage.payload));
      }

      if (decodedMessage.type === 'NEW_MESSAGE') {
        dispatch(addMessage(decodedMessage.payload));
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected, attempting to reconnect...');
      connectWebSocket();
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      ws.current?.close();
    };
  }, [dispatch, token]);

  useEffect(() => {
    connectWebSocket();

    return () => {
      ws.current?.close();
    };
  }, [connectWebSocket, token]);

  const sendMessage = (message: string) => {
    if (!ws.current) return;

    ws.current.send(
      JSON.stringify({
        type: 'SEND_MESSAGE',
        payload: message,
      }),
    );
  };

  return (
    <Grid2 container mt={4} mb={4}>
      <MessagesLayout
        onSubmit={sendMessage}
        messages={messages}
        messageUsers={onlineUsers}
        messageCreating={isCreating}
        messagesFetching={messagesFetching}
        usersFetching={messagesFetching}
      />
    </Grid2>
  );
};

export default Messages;
