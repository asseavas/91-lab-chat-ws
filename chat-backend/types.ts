import { Model } from 'mongoose';

export interface Message {}

export interface IncomingMessage {
  type: string;
  payload: string;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: string;
  displayName?: string;
  googleID?: string;
  __confirmPassword: string;
}

export interface UserVirtuals {
  confirmPassword: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;
