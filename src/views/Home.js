import React from 'react';
import { Redirect } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.username) {
      return <Redirect to=''/>;
    }

    return (
      <div>
        pog
      </div>
    );
  }
}

export default Home;
