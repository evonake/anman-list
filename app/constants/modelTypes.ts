import mongoose, { ObjectId } from 'mongoose';

export type TypeUser = mongoose.Document & {
  username: string;
  password: string;
  itemIds: ObjectId[];
};

// TODO: create collections of items
//       ie. "books", "movies", "games", etc.
//       each collection would have a trackerType (ie. "page", "chapter", "episode")
//       each item in the collection would inherit the trackerType

export type TypeItem = mongoose.Document & {
  title: string;
  link?: string;
  trackers: { name: string; value: number }[];
  status?: 'ongoing' | 'completed' | 'dropped';
};
