import React, { useState, useEffect } from 'react';
import isEqual from 'lodash.isequal';

import './ItemList.css';

import { getUserData } from '../server';
import Item    from './Item';
import AddItem from './AddItem';


function ItemList(props) {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const a = async () => {
      const newData = await getUserData(props.username, props.tab, 'ongoing')
      if (!isEqual(data, newData)) {
        setData(newData);
      }
    };
    a();
  });

  if (!data) {
    return (
      <div className='ItemList'>
        <AddItem
          type={props.mediaType}/>
      </div>
    );
  }

  let items = [];
  for (const [key, value] of Object.entries(data)) {
    items.push({title: key, season: value.season, episode: value.episode, chapter: value.chapter, link: value.link});
  }

  return (
    <div className='ItemList'>
      <AddItem
        type={props.mediaType}/>
      {items.map(a => {
        return <Item
                  key={a.title}
                  title={a.title}
                  season={a.season}
                  episode={a.episode}
                  chapter={a.chapter}
                  link={a.link}
                  type={props.mediaType}
                  toggleSnackbar={props.toggleSnackbar}/>})}
    </div>
  );
}

export default ItemList;

/*
class ItemList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.userData,
    };
  }

  async componentDidUpdate(prevState) {
    if (this.props.data !== prevState.data) {
      this.setState({ data: this.props.data });
    }
  }

  updateItem(title, data) {
    this.props.server.modifyAnime(this.props.username, this.props.type, title, data);
  }

  async submitAnime(title, data) {
    this.props.server.newAnime(this.props.username, this.props.type, title, data);
    await this.props.refresh();
  }

  async submitManga(title, data) {
    this.props.server.newManga(this.props.username, this.props.type, title, data);
    await this.props.refresh();
  }

  render() {
    if (!this.state.data) {
      return (
        <div className='ItemList'>
          <AddItem
            submitAnime={ (t, d) => this.submitAnime(t, d) }
            submitManga={ (t, d) => this.submitManga(t, d) }
            type={this.props.mediaType}/>
        </div>
      );
    }

    let items = [];
    for (const [key, value] of Object.entries(this.state.data)) {
      items.push({title: key, season: value.season, episode: value.episode, chapter: value.chapter, link: value.link});
    }
    console.log(items)

    return (
      <div className='ItemList'>
        <AddItem
          submitAnime={ (t, d) => this.submitAnime(t, d) }
          submitManga={ (t, d) => this.submitManga(t, d) }
          type={this.props.mediaType}/>
        {items.map(a => {
          return <Item
                    key={a.title}
                    title={a.title}
                    season={a.season}
                    episode={a.episode}
                    chapter={a.chapter}
                    link={a.link}
                    type={this.props.mediaType}
                    update={this.updateItem}
                    toggleSnackbar={this.props.toggleSnackbar}/>})}
      </div>
    );
  }
}

export default ItemList;
*/
