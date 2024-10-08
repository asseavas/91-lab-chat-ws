export interface Message {
  _id: string;
  user: {
    _id: string;
    displayName: string;
  };
  text: string;
  createdAt: string;
}

export interface IncomingMessage {
  type: string;
  payload: Message;
}

export interface IncomingMessages {
  type: string;
  payload: Message[];
}

export interface RegisterMutation {
  username: string;
  displayName: string;
  password: string;
  confirmPassword: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  displayName: string;
}

export interface OnlineUser {
  _id: string;
  displayName: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
