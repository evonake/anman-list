import React, { useState, useReducer } from 'react';
import { isEqual } from 'lodash';

import {
  Grid,
  Paper,
  Typography,
  IconButton,
 } from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


function dataReducer(state, action, type) {
  if (action.type === 'epch') {
    action.type = type === 'manga' ? 'chapter' : 'episode';
  }

  if (action.value === 'down' && state[action.type] === 0) {
    return state;
  }

  return {
    ...state,
    [action.type]: action.value === 'up' ? state[action.type] + 1 : state[action.type] - 1,
  };
}

function Item(props) {
  const [originalData, ] = useState(props.data);
  const [newData, setNewData] = useReducer((s, a) => dataReducer(s, a, props.type), props.data);

  const copyLink = () => {
    navigator.clipboard.writeText(newData.link);
    props.toggleSnackbar();
  }
  const itemHasUpdated = () => {
    return !isEqual(originalData, newData);
  }
  const updateItem = () => {
    if (itemHasUpdated()) {
      props.update(newData.title, newData)
    }
  }

  const renderSeasonCounter= () => {
    return (
      <Grid item xs container direction='column' justify='center'>
        <Grid item>
          <IconButton size='small' onClick={ () => setNewData({type: 'season', value: 'up'}) }>
            <KeyboardArrowUpIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant='overline'>{newData.season}</Typography>
        </Grid>
        <Grid item>
          <IconButton size='small' onClick={ () => setNewData({type: 'season', value: 'down'}) }>
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
          <IconButton size='small' onClick={ () => setNewData({type: 'epch', value: 'up'}) }>
            <KeyboardArrowUpIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant='overline'>{props.type === 'manga' ? newData.chapter : newData.episode}</Typography>
        </Grid>
        <Grid item>
          <IconButton size='small' onClick={ () => setNewData({type: 'epch', value: 'down' }) }>
            <KeyboardArrowDownIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  }

  return (
    <Paper className='Item'>
      <Grid container direction='row' className='cell'>
        <Grid item xs={9} container direction='column' className='contentText'>
          <Grid item style={{ 'width': '100%' }}>
            <Typography noWrap variant='h6'>
              {newData.title}
            </Typography>
          </Grid>
          <br/>
          <Grid item container direction='row'>
            <Grid item xs>
              <Typography noWrap variant='body2' color="primary" onClick={() => copyLink()}>
                <a className="link">{newData.link}</a>
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={2} container>
          {props.type === 'manga' ? <div/> : renderSeasonCounter()}
          {renderEpisodeChapterCounter()}
        </Grid>

        <Grid item xs={1} container justify="center" alignItems="center">
          <IconButton disabled={!itemHasUpdated()} onClick={updateItem} >
            <CheckIcon />
          </IconButton>
          <IconButton disabled={!itemHasUpdated()} onClick={updateItem}>
            <ClearIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );

}

export default Item;
