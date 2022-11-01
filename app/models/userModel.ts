import mongoose from 'mongoose';

import { defaultUser } from '../constants/modelTypes';
import type { TypeUser } from '../constants/modelTypes';

const UserSchema = new mongoose.Schema<TypeUser>({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    select: false,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    select: false,
  },
  lists: {
    type: [mongoose.Schema.Types.ObjectId],
    default: defaultUser.lists,
  },
});

export default mongoose.model('User', UserSchema);
