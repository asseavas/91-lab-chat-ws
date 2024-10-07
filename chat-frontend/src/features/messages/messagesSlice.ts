import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Message } from '../../types';

export interface MessagesState {
  items: Message[];
  itemsFetching: boolean;
  isCreating: boolean;
}

const initialState: MessagesState = {
  items: [],
  itemsFetching: false,
  isCreating: false,
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.items = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.items.push(action.payload);
    },
    setMessagesFetching: (state, action: PayloadAction<boolean>) => {
      state.itemsFetching = action.payload;
    },
    setIsCreating: (state, action: PayloadAction<boolean>) => {
      state.isCreating = action.payload;
    },
  },
  selectors: {
    selectMessages: (state) => state.items,
    selectMessagesFetching: (state) => state.itemsFetching,
    selectMessageCreating: (state) => state.isCreating,
  },
});

export const messagesReducer = messagesSlice.reducer;

export const { setMessages, addMessage, setMessagesFetching, setIsCreating } = messagesSlice.actions;
export const { selectMessages, selectMessagesFetching, selectMessageCreating } = messagesSlice.selectors;
