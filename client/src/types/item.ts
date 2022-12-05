export type TypeItem = {
  _id?: string;
  title: string;
  link?: string;
  trackers: { name: string; value: number }[];
  status?: 'ongoing' | 'completed' | 'dropped';
  listId: string;
};

export type TypeDBItem = TypeItem & {
  _id: string;
};

export type TypeItemList = {
  name: string;
  trackerNames: string[];
};

export type TypeDBItemList = TypeItemList & {
  _id: string;
  items: TypeDBItem[];
};
