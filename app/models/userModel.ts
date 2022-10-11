import mongoose from 'mongoose';

import type { TypeUser } from '../constants/modelTypes';

const UserSchema = new mongoose.Schema<TypeUser>({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  itemIds: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
});

export default mongoose.model('User', UserSchema);
