import React from 'react';

import { TextField, Button } from '@material-ui/core';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginUsername:       '',
      loginPassword:       '',

      signupUsername:      '',
      signupPassword:      '',
      signupConfirm:       '',

      loginUsernameError:  '',
      loginPasswordError:  '',

      signupUsernameError: '',
      signupPasswordError: '',
      signupConfirmError:  ''
    }

    this.handleText        = this.handleText.bind(this);
    this.handleLoginClick  = this.handleLoginClick.bind(this);
    this.handleSignupClick = this.handleSignupClick.bind(this);
  }

  handleText(type, value) {
    this.setState({
      [type]: value,
      loginUsernameError: type === 'loginUsername' ? false : this.state.loginUsernameError,
      loginPasswordError: type === 'loginPassword' ? false : this.state.loginPasswordError,

      signupUsernameError: type === 'signupUsername' ? false : this.state.signupUsernameError,
      signupPasswordError: type === 'signupPassword' ? false : this.state.signupPasswordError,
      signupConfirmError:  type === 'signupConfirm'  ? false : this.state.signupConfirmError
    });
  }

  async handleLoginClick() {
    if (this.state.loginUsername === '') {
      this.setState({ loginUsernameError: 'Invalid username.' });
      return;
    } else if (!(await this.props.server.userExists(this.state.loginUsername))) {
      this.setState({ loginUsernameError: 'Username not taken.' });
      return;
    }

    if (this.state.loginPassword === '') {
      this.setState({ loginPasswordError: 'Invalid password.' });
      return;
    }

    if (!(await this.props.server.verifyPassword(this.state.loginUsername, this.state.loginPassword))) {
      this.setState({ loginConfirmError: 'Incorrect password.' });
      return;
    }

    this.props.goHome();
  }

  async handleSignupClick() {
    if (this.state.signupUsername === '') {
      this.setState({ signupUsernameError: 'Invalid username.' });
      return;
    } else if (await this.props.server.userExists(this.state.signupUsername)) {
      this.setState({ signupUsernameError: 'Username already taken.' });
      return;
    }

    if (this.state.signupPassword === '') {
      this.setState({ signupPasswordError: 'Invalid password.' });
      return;
    }

    if (this.state.signupPassword !== this.state.signupConfirm) {
      this.setState({ signupConfirmError: 'Passwords don\'t match.' });
      return;
    }

    this.props.server.newUser(this.state.signupUsername, this.state.signupPassword);
    this.props.goHome();
  }

  renderLogin() {
    return (
      <div className='form'>
        <TextField
          error={this.state.loginUsernameError}
          id='standard-basic'
          label='Username'
          value={this.state.loginUsername}
          helperText={this.state.loginUsernameError}
          onChange={e => this.handleText('loginUsername', e.target.value)}/>

        <br/><br/>

        <TextField
          error={this.state.loginPasswordError}
          id='standard-basic'
          type='password'
          label='Password'
          value={this.state.loginPassword}
          helperText={this.state.loginPasswordError}
          onChange={e => this.handleText('loginPassword', e.target.value)}/>

        <br/><br/>

        <Button color="primary" onClick={this.handleLoginClick}>Login</Button>
      </div>
    );
  }

  renderSignup() {
    return (
      <div className='form'>
        <TextField
          error={this.state.signupUsernameError}
          id='standard-basic'
          label='Username'
          value={this.state.signupUsername}
          helperText={this.state.signupUsernameError}
          onChange={e => this.handleText('signupUsername', e.target.value)}/>

        <br/><br/>

        <TextField
          error={this.state.signupPasswordError}
          id='standard-basic'
          type='password'
          label='Password'
          value={this.state.signupPassword}
          helperText={this.state.signupPasswordError}
          onChange={e => this.handleText('signupPassword', e.target.value)}/>

        <br/><br/>

        <TextField
          error={this.state.signupConfirmError}
          id='standard-basic'
          type='password'
          label='Password'
          value={this.state.signupConfirn}
          helperText={this.state.signupConfirmError}
          onChange={e => this.handleText('signupConfirm', e.target.value)}/>

        <br/><br/>

        <Button color="primary" onClick={this.handleSignupClick}>Sign Up</Button>
      </div>
    );
  }

  render() {
    return (
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        {this.renderLogin()}

        <br/><br/>

        {this.renderSignup()}
      </div>
    );
  }
}

export default Login;
