import React from 'react';

import './Item.css';

import Grid       from '@material-ui/core/Grid';
import Paper      from '@material-ui/core/Paper';
import Switch     from '@material-ui/core/Switch';
import Button     from '@material-ui/core/Button';
import TextField  from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

class AddItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper className='Item' style={{ borderStyle: 'solid', borderWidth: '1px', borderColor: '#5F527A' }}>
        <Grid container direction='row' className='cell'>
          <Grid item xs={10} container direction='column' className='contentText'>
            <Grid item container direciton='row' alignItems='center'>
              <Grid item xs={8}>
                <TextField label='Title' variant='outlined' style={{ width: '80%' }}/>
              </Grid>
              <Grid item xs container direction='row' alignItems='center'>
                <Grid item>S/E</Grid>
                <Grid item><Switch /></Grid>
                <Grid item>Ch.</Grid>
              </Grid>
            </Grid>
            <br/>
            <Grid item container direction='row' alignItems='center'>
              <TextField label='Link' variant='outlined' size='small' style={{ width: '70%', margin: '0 10% 0 0' }} />
              <Button variant='outlined'>Add</Button>
            </Grid>
          </Grid>

          <Grid item xs container>
            <Grid item xs container direction='column' justify='center'>
              <Grid item>
                <IconButton size='small' onClick={ () => {console.log('season up') }} >
                  <KeyboardArrowUpIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <TextField defaultValue='1' variant='outlined' size='small' style={{ width: '90%' }} inputProps={{style: { textAlign: 'center',  padding: '10.5px 7px'}}}/>
              </Grid>
              <Grid item>
                <IconButton size='small' onClick={ () => {console.log('season down') }} >
                  <KeyboardArrowDownIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid item xs container direction='column' justify='center'>
              <Grid item>
                <IconButton size='small' onClick={ () => {console.log('episode up') }} >
                  <KeyboardArrowUpIcon />
                </IconButton>
              </Grid>
              <Grid item>
                <TextField defaultValue='1' variant='outlined' size='small' style={{ width: '90%' }} inputProps={{style: { textAlign: 'center',  padding: '10.5px 7px'}}}/>
              </Grid>
              <Grid item>
                <IconButton size='small' onClick={ () => {console.log('episode down') }}>
                  <KeyboardArrowDownIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default AddItem;
