import React from 'react';

import './Item.css';

import Accordion        from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography       from '@material-ui/core/Typography';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class Item extends React.Component {
  render() {
    return (
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
          <Typography className='titleText' noWrap variant='h6'>
            That Time I Got
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          poggers
        </AccordionDetails>
      </Accordion>
    );
  }
}

export default Item;
