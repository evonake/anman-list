type TypeItem = {
  _id?: string;
  title: string;
  link?: string;
  trackers: { name: string; value: number }[];
  status?: 'ongoing' | 'completed' | 'dropped';
};

export type TypeDBItem = TypeItem & {
  _id: string;
};

export default TypeItem;
