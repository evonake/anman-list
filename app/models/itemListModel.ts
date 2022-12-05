import mongoose from 'mongoose';

import { defaultItemList } from '../constants/modelTypes';
import type { TypeItemList } from '../constants/modelTypes';

const ItemListSchema = new mongoose.Schema<TypeItemList>({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  trackerNames: {
    type: [String],
    default: defaultItemList.trackerNames,
    minItems: 1,
  },
  items: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Item',
    default: defaultItemList.items,
  },
});

export default mongoose.model('ItemList', ItemListSchema);
