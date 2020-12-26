import React from 'react';

import './ItemList.css';

import Item    from './Item';
import AddItem from './AddItem';

class ItemList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.userData,
    };
  }

  componentDidUpdate(prevState) {
    if (this.props.data !== prevState.data) {
      this.setState({ data: this.props.data });
    }
  }

  updateItem(title, data) {
    this.props.server.modifyAnime(this.props.username, this.props.type, title, data);
  }

  render() {
    if (!this.state.data) {
      return <div />;
    }

    let items = [];
    for (const [key, value] of Object.entries(this.state.data.animes.ongoing)) {
      items.push({title: key, season: value.season, episode: value.episode, link: value.link});
    }
    console.log(items)

    return (
      <div className='ItemList'>
        <AddItem />
        {items.map(a => {
          return <Item title={a.title} season={a.season} episode={a.episode} link={a.link} />
        })}
      </div>
    );
  }
}

export default ItemList;
