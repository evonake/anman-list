import React, { useState, useReducer } from 'react';
import { pick } from 'lodash';

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

import { newManga, newAnime } from '../server';


const initialData = {
  title: '',
  link: '',
  season: 1,
  episode: 1,
  chapter: 1,
}
function dataReducer(state, action, mediaType) {
  if (action.type === 'reset') {
    return initialData;
  }
  if (action.type === 'epch') {
    action.type = mediaType === 'manga' ? 'chapter' : 'episode';
  }

  if (['season', 'episode', 'chapter'].includes(action.type)) {
    if (action.value === 'down') {
      action.value = state[action.type] - 1;
    } else if (action.value === 'up') {
      action.value = state[action.type] + 1;
    }

    if (isNaN(Number(action.value))) {
      return state;
    }
    action.value = Number(action.value)

    if (action.value < 0) {
      action.value = 0;
    }
  }

  return {
    ...state,
    [action.type]: action.value,
  };
}

function AddItem(props) {
  const [data, setData] = useReducer((s, a) => dataReducer(s, a, props.tab), initialData);
  const [titleError, setTitleError] = useState(false);
  const [linkError, setLinkError] = useState(false);

  const submit = async () => {
    // check if inputs are valid
    if (!data.title) {
      setTitleError(true);
      return;
    }
    if (!data.link) {
      setLinkError(true);
      return;
    }

    if (props.type === 'manga') {
      newManga(props.username, props.status, pick(data, ['title', 'chapter', 'link']))
    } else if (props.type === 'anime') {
      newAnime(props.username, props.status, pick(data, ['title', 'season', 'episode', 'link']))
    }
    await props.refresh();

    setData({ type: 'reset' });
    setTitleError(false);
    setLinkError(false);
  }

  const renderSeasonCounter = () => {
    return (
      <Grid item xs container direction='column' justify='center'>
        <Grid item>
          <IconButton
            size='small'
            onClick={() => setData( {type: 'season', value: 'up'} )}>
            <KeyboardArrowUpIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <TextField
            variant='outlined'
            size='small'
            style={{ width: '90%' }}
            inputProps={{ style: { textAlign: 'center', padding: '10.5px 7px' } }}
            value={data.season}
            onChange={(e) => setData( {type: 'season', value: e.target.value} )} />
        </Grid>
        <Grid item>
          <IconButton
            size='small'
            onClick={() => setData( {type: 'season', value: 'down'} )} >
            <KeyboardArrowDownIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
  const renderEpisodeChapterCounter = () => {
    return (
      <Grid item xs container direction='column' justify='center'>
        <Grid item>
          <IconButton
            size='small'
            onClick={() => setData( {type: 'epch', value: 'up' } )} >
            <KeyboardArrowUpIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <TextField
            variant='outlined'
            size='small'
            style={{ width: '90%', maxWidth: '50px' }}
            inputProps={{ style: { textAlign: 'center', padding: '10.5px 7px' } }}
            value={props.type === 'manga' ? data.chapter : data.episode}
            onChange={(e) => setData( {type: 'epch', value: e.target.value} )} />
        </Grid>
        <Grid item>
          <IconButton
            size='small'
            onClick={() => setData( {type: 'epch', value: 'down'} )}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
  return (
    <Paper className='Item' style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: '#5F527A' }}>
      <Grid container direction='row' className='cell'>
        <Grid item xs={10} container direction='column' className='contentText'>
          <Grid item container direciton='row' alignItems='center'>
            <TextField
              label='Title'
              error={titleError}
              variant='outlined'
              style={{ width: '90%' }}
              value={data.title}
              onClick={() => setTitleError(false)}
              onChange={(e) => setData( {type: 'title', value: e.target.value} )} />
          </Grid>
          <br />
          <Grid item container direction='row' alignItems='center'>
            <TextField
              label='Link'
              error={linkError}
              variant='outlined'
              size='small'
              style={{ width: '75%', margin: '0 5% 0 0' }}
              value={data.link}
              onClick={() => setLinkError(false)}
              onChange={(e) => setData( {type: 'link', value: e.target.value} )} />
            <Button variant='outlined' onClick={submit}>Add</Button>
          </Grid>
        </Grid>
        <Grid item xs container>
          {props.type === 'manga' ? <div /> : renderSeasonCounter()}
          {renderEpisodeChapterCounter()}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default AddItem;
