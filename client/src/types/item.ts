export type TypeItem = {
  _id?: string;
  title: string;
  link?: string;
  trackers: { name: string; value: number }[];
  status?: 'ongoing' | 'completed' | 'dropped';
};

export type TypeDBItem = TypeItem & {
  _id: string;
};

export type TypeItemList = {
  name: string;
  trackerNames: string[];
  items: TypeDBItem[];
};

export type TypeDBItemList = TypeItemList & {
  _id: string;
};
