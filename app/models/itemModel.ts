import mongoose from 'mongoose';

import type { TypeItem } from '../constants/modelTypes';

const ItemSchema = new mongoose.Schema<TypeItem>({
  title: {
    type: String,
    trim: true,
    required: true,
    immutable: true,
  },
  link: {
    type: String,
    trim: true,
    default: '',
  },
  trackers: {
    type: [new mongoose.Schema({ name: String, value: Number }, { _id: false })],
    default: [{ name: 'Page', value: 0 }],
    minItems: 1,
  },
  status: {
    type: String,
    trim: true,
    default: 'ongoing',
  },
});

export default mongoose.model('Item', ItemSchema);
