import mongoose from 'mongoose';

import { defaultItem } from '../constants/modelTypes';
import type { TypeItem } from '../constants/modelTypes';

const ItemSchema = new mongoose.Schema<TypeItem>({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  link: {
    type: String,
    trim: true,
    default: defaultItem.link,
  },
  trackers: {
    type: [new mongoose.Schema({ name: String, value: Number }, { _id: false })],
    default: defaultItem.trackers,
    minItems: 1,
  },
  status: {
    type: String,
    trim: true,
    default: defaultItem.status,
  },
});

export default mongoose.model('Item', ItemSchema);
