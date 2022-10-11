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
  tracker: {
    type: Map,
    of: Number,
    default: new Map([['page', 1]]),
    validate: (t: Map<string, number>) => t.size > 0,
  },
  status: {
    type: String,
    trim: true,
    default: 'ongoing',
  },
});

export default mongoose.model('Item', ItemSchema);
