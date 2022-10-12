type TypeItem = {
  _id: string;
  title: string;
  link?: string;
  tracker: Map<string, number>;
  status?: 'ongoing' | 'completed' | 'dropped';
};

export default TypeItem;
