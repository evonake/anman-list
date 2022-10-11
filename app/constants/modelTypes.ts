import mongoose, { ObjectId } from 'mongoose';

export type TypeUser = mongoose.Document & {
  username: string;
  password: string;
  itemIds: ObjectId[];
};

export type TypeItem = mongoose.Document & {
  title: string;
  link?: string;
  tracker: Map<string, number>;
  status?: 'ongoing' | 'completed' | 'dropped';
};
