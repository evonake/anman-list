import mongoose, { ObjectId } from 'mongoose';

export type TypeUser = mongoose.Document & {
  username: string;
  password: string;
  lists: ObjectId[];
};
export const defaultUser = {
  lists: [],
} as unknown as TypeUser;

export type TypeItemList = mongoose.Document & {
  name: string;
  trackerNames: string[];
  items: ObjectId[];
};
export const defaultItemList = {
  trackerNames: ['Page'],
  items: [],
} as unknown as TypeItemList;

export type TypeItem = mongoose.Document & {
  title: string;
  link: string;
  trackers: { name: string, value: number }[];
  status: 'ongoing' | 'completed' | 'dropped';
};
export const defaultItem = {
  link: '',
  trackers: [{ name: 'Page', value: 0 }],
  status: 'ongoing',
} as unknown as TypeItem;
