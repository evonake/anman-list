import React from 'react';
import './Item.css';

import {
  Grid,
  Paper,
  Typography,
  IconButton,
  Snackbar,
 } from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      original: {
        title:   this.props.title,
        link:    this.props.link,
        season:  this.props.season,
        episode: this.props.episode,
        chapter: this.props.chapter,
      },
      new: {
        title:   this.props.title,
        link:    this.props.link,
        season:  this.props.season,
        episode: this.props.episode,
        chapter: this.props.chapter,
      },
    };

    this.itemHasUpdated = this.itemHasUpdated.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }

  copyLink() {
    navigator.clipboard.writeText(this.state.new.link);
    this.props.toggleSnackbar();
  }

  itemHasUpdated() {
    const original = this.state.original;
    const n = this.state.new;

    if (original.title && original.title !== n.title) {
      return true;
    }
    if (original.link && original.link !== n.link) {
      return true;
    }
    if (original.season && original.season !== n.season) {
      return true;
    }
    if (original.episode && original.episode !== n.episode) {
      return true;
    }
    if (original.chapter && original.chapter !== n.chapter) {
      return true;
    }
    return false;
  }

  updateItem() {
    if (this.itemHasUpdated()) {
      this.props.update(this.state.new.title, this.state.new)
    }
  }

  handleInput(type, value) {
    if (type === 'epch') {
      type = this.props.type === 'manga' ? 'chapter' : 'episode';
    }

    if (['season', 'episode', 'chapter'].includes(type)) {
      if (isNaN(Number(value))) {
        return;
      }

      value = Number(value)

      if (value < 0) {
        value = 0;
      }
      console.log(value);
    }

    this.setState(prevState => ({
      new: {
        ...prevState.new,
        [type]: value
      }
    }));
    console.log(this.state);
  }

  renderSeasonCounter() {
    return (
      <Grid item xs container direction='column' justify='center'>
        <Grid item>
          <IconButton size='small' onClick={ () => this.handleInput('season', this.state.new.season + 1) }>
            <KeyboardArrowUpIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant='overline'>{this.state.new.season}</Typography>
        </Grid>
        <Grid item>
          <IconButton size='small' onClick={ () => this.handleInput('season', this.state.new.season - 1) }>
            <KeyboardArrowDownIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  }

  renderEpisodeChapterCounter() {
    return (
      <Grid item xs container direction='column' justify='center'>
        <Grid item>
          <IconButton size='small' onClick={ () => this.handleInput('epch', this.props.type === 'manga' ? this.state.new.chapter + 1 : this.state.new.episode + 1) }>
            <KeyboardArrowUpIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant='overline'>{this.props.type === 'manga' ? this.state.new.chapter : this.state.new.episode}</Typography>
        </Grid>
        <Grid item>
          <IconButton size='small' onClick={ () => this.handleInput('epch', this.props.type === 'manga' ? this.state.chapter - 1 : this.state.new.episode - 1) }>
            <KeyboardArrowDownIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <Paper className='Item'>
        <Grid container direction='row' className='cell'>
          <Grid item xs={9} container direction='column' className='contentText'>
            <Grid item style={{ 'width': '100%' }}>
              <Typography noWrap variant='h6'>
                {this.state.new.title}
              </Typography>
            </Grid>
            <br/>
            <Grid item container direction='row'>
              <Grid item xs>
                <Typography noWrap variant='body2' color="primary" onClick={() => this.copyLink()}>
                  <a className="link">{this.state.new.link}</a>
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={2} container>
            {this.props.type === 'manga' ? <div/> : this.renderSeasonCounter()}
            {this.renderEpisodeChapterCounter()}
          </Grid>

          <Grid item xs={1} container justify="center" alignItems="center">
            <IconButton disabled={!this.itemHasUpdated()} onClick={this.updateItem} >
              <CheckIcon />
            </IconButton>
            <IconButton disabled={!this.itemHasUpdated()} onClick={this.updateItem}>
              <ClearIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default Item;
