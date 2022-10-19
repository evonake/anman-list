type TypeItem = {
  _id: string;
  title: string;
  link?: string;
  tracker: { [key: string]: number };
  status?: 'ongoing' | 'completed' | 'dropped';
};

export default TypeItem;
