import React from 'react';

import './Item.css';

import Grid        from '@material-ui/core/Grid';
import Paper       from '@material-ui/core/Paper';
import Typography  from '@material-ui/core/Typography';
import IconButton  from '@material-ui/core/IconButton';

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title:   this.props.title,
      link:    this.props.link,
      season:  this.props.season,
      episode: this.props.episode,
      chapter: this.props.chapter,
    };
  }

  updateItem() {
    // this.props.updateItem
  }

  renderSeasonCounter() {
    return (
      <Grid item xs container direction='column' justify='center'>
        <Grid item>
          <IconButton size='small' onClick={ () => {console.log('season down') }}>
            <KeyboardArrowUpIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant='overline'>{this.state.season}</Typography>
        </Grid>
        <Grid item>
          <IconButton size='small' onClick={ () => {console.log('season down') }} >
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
          <IconButton size='small' onClick={ () => {console.log('episode up') }} >
            <KeyboardArrowUpIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant='overline'>{this.props.type === 'manga' ? this.state.chapter : this.state.episode}</Typography>
        </Grid>
        <Grid item>
          <IconButton size='small' onClick={ () => {console.log('episode down') }}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  }

  render() {
    console.log(this.state)
    return (
      <Paper className='Item'>
        <Grid container direction='row' className='cell'>
          <Grid item xs={10} container direction='column' className='contentText'>
            <Typography noWrap variant='h6' style={{ 'width': '100%' }}>
              {this.state.title}
            </Typography>
            <br/>
            <Typography noWrap variant='body1' style={{ 'width': '100%' }}>
              {this.state.link}
            </Typography>
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

export default Item;
