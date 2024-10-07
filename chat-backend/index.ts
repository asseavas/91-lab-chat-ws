import express from 'express';
import expressWs from 'express-ws';
import cors from 'cors';
import config from './config';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import { WebSocket } from 'ws';
import Message from './models/Message';
import { IncomingMessage } from './types';
import User from './models/User';

const app = express();
const port = 8000;

expressWs(app);
app.use(cors(config.corsOptions));
app.use(express.json());
app.use('/users', usersRouter);

const chatRouter = express.Router();

const connectedClients: WebSocket[] = [];

chatRouter.ws('/', async (ws, req) => {
  connectedClients.push(ws);
  console.log('client connected, total clients:', connectedClients.length);

  let token = '';

  const lastMessages = await Message.find().sort({ createdAt: -1 }).limit(30).populate('user', 'displayName');
  ws.send(JSON.stringify({ type: 'LAST_MESSAGES', payload: lastMessages }));

  ws.on('message', async (message) => {
    try {
      const decodedMessage = JSON.parse(message.toString()) as IncomingMessage;

      if (decodedMessage.type === 'LOGIN') {
        token = decodedMessage.payload;

        if (decodedMessage.payload !== token) {
          ws.send(JSON.stringify({ type: 'ERROR', payload: 'Wrong token!' }));
          ws.close();
          return;
        }

        const user = await User.findOne({ token });

        if (!user || user.token !== token) {
          ws.send(JSON.stringify({ type: 'ERROR', payload: 'Invalid token' }));
          ws.close();
          return;
        }
      }

      if (decodedMessage.type === 'SEND_MESSAGE' && token) {
        const user = await User.findOne({ token });

        if (!user) {
          ws.send(JSON.stringify({ type: 'ERROR', payload: 'Invalid token' }));
          return;
        }

        const newMessage = new Message({
          user: user._id,
          text: decodedMessage.payload,
        });

        await newMessage.save();

        connectedClients.forEach((clientWs) => {
          clientWs.send(
            JSON.stringify({
              type: 'NEW_MESSAGE',
              payload: {
                username: user.displayName,
                text: decodedMessage.payload,
              },
            }),
          );
        });
      }
    } catch (error) {
      ws.send(JSON.stringify({ type: 'ERROR', payload: 'Invalid message' }));
    }
  });

  ws.on('close', () => {
    console.log('client disconnected');
    const index = connectedClients.indexOf(ws);
    connectedClients.splice(index, 1);
  });
});

app.use('/chat', chatRouter);

const run = async () => {
  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);
