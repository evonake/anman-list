import React from 'react';

import './Item.css';

import {
  Grid,
  Paper,
  Button,
  TextField,
  IconButton,
} from '@mui/material';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


class AddItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title:   this.props.title   || '',
      link:    this.props.link    || '',
      season:  this.props.season  || 1,
      episode: this.props.episode || 1,
      chapter: this.props.chapter || 1,
      titleError: false,
      linkError: false,
    };

    this.submit = this.submit.bind(this);
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
    }

    this.setState({ [type]: value });
  }

  handleInputClick(type) {
    this.setState({
      titleError: type === 'title' ? false : this.state.titleError,
      linkError:  type === 'link' ? false : this.state.linkError,
    });
  }

  async submit() {
    // check if inputs are valid
    if (!this.state.title) {
      this.setState({ titleError: true });
      return;
    }
    if (!this.state.link) {
      this.setState({ linkError: true })
      return;
    }

    if (this.props.type === 'manga') {
      await this.props.submitManga(this.state.title, { 'chapter': this.state.chapter, 'link': this.state.link });
    } else {
      await this.props.submitAnime(this.state.title, { 'season': this.state.season, 'episode': this.state.episode, 'link': this.state.link });
    }

    this.setState({
      title: '',
      link: '',
      season: 1,
      episode: 1,
      chapter: 1,
      titleError: false,
      linkError: false,
    });
  }

  renderSeasonCounter() {
    return (
      <Grid item xs container direction='column' justify='center'>
        <Grid item>
          <IconButton
            size='small'
            onClick={ () => this.handleInput('season', this.state.season + 1) } >
            <KeyboardArrowUpIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <TextField
            variant='outlined'
            size='small'
            style={{ width: '90%' }}
            inputProps={{style: { textAlign: 'center',  padding: '10.5px 7px'}}}
            value={this.state.season}
            onChange={ (e) => this.handleInput('season', e.target.value) }/>
        </Grid>
        <Grid item>
          <IconButton
            size='small'
            onClick={ () => this.handleInput('season', this.state.season - 1) } >
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
          <IconButton
            size='small'
            onClick={ () => this.handleInput('epch', this.props.type === 'manga' ? this.state.chapter + 1 : this.state.episode + 1) } >
            <KeyboardArrowUpIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <TextField
            variant='outlined'
            size='small'
            style={{ width: '90%', maxWidth: '50px' }}
            inputProps={{style: { textAlign: 'center',  padding: '10.5px 7px'}}}
            value={this.props.type === 'manga' ? this.state.chapter : this.state.episode}
            onChange={ (e) => this.handleInput('epch', e.target.value) }/>
        </Grid>
        <Grid item>
          <IconButton
            size='small'
            onClick={ () => this.handleInput('epch', this.props.type === 'manga' ? this.state.chapter - 1 : this.state.episode - 1) }>
            <KeyboardArrowDownIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  }

  render() {
    return (
      <Paper className='Item' style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: '#5F527A' }}>
        <Grid container direction='row' className='cell'>
          <Grid item xs={10} container direction='column' className='contentText'>
            <Grid item container direciton='row' alignItems='center'>
              <TextField
                label='Title'
                error={this.state.titleError}
                variant='outlined'
                style={{ width: '90%' }}
                value={this.state.title}
                onClick={ () => this.handleInputClick('title') }
                onChange={ (e) => this.handleInput('title', e.target.value) }/>
            </Grid>
            <br/>
            <Grid item container direction='row' alignItems='center'>
              <TextField
                label='Link'
                error={this.state.linkError}
                variant='outlined'
                size='small'
                style={{ width: '75%', margin: '0 5% 0 0' }}
                value={this.state.link}
                onClick={ () => this.handleInputClick('link') }
                onChange={ (e) => this.handleInput('link', e.target.value) }/>
              <Button variant='outlined' onClick={this.submit}>Add</Button>
            </Grid>
          </Grid>
          <Grid item xs container>
            {this.props.type === 'manga' ? <div/> : this.renderSeasonCounter()}
            {this.renderEpisodeChapterCounter()}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default AddItem;
