export type TypeDBItem = {
  _id: string;
  title: string;
  link?: string;
  trackers: { name: string; value: number }[];
  status?: 'ongoing' | 'completed' | 'dropped';
};

type TypeItem = Omit<TypeDBItem, '_id'>;

export default TypeItem;
