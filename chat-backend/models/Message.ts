import mongoose, {Types} from 'mongoose';
import User from './User';

const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist!',
    },
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;
