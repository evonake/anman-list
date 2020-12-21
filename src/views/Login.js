import React from 'react';

import Button         from '@material-ui/core/Button';
import IconButton     from '@material-ui/core/IconButton';
import Input          from '@material-ui/core/Input';
import InputLabel     from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl    from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import Visibility    from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import './LoginSignup.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username:       '',
      password:       '',

      usernameError:  '',
      passwordError:  '',

      hidePassword: true,
      loginButtonHover: false,
      signupButtonHover: false,
    }

    this.handleText          = this.handleText.bind(this);
    this.handleHover   = this.handleHover.bind(this);
    this.handleLoginClick    = this.handleLoginClick.bind(this);
    this.handlePasswordClick = this.handlePasswordClick.bind(this);
  }

  handleText(type, value) {
    this.setState({
      [type]: value,
    });
  }

  handleInputClick(type) {
    this.setState({
      usernameError: type === 'username' ? false : this.state.usernameError,
      passwordError: type === 'password' ? false : this.state.passwordError,
    });
  }

  handleHover(type) {
    this.setState({
      loginButtonHover: type === 'login' ? !this.state.loginButtonHover : this.state.loginButtonHover,
      signupButtonHover: type === 'signup' ? !this.state.signupButtonHover : this.state.signupButtonHover,
    });
  }

  async handleLoginClick() {
    if (this.state.username === '') {
      this.setState({ usernameError: 'Invalid username.' });
      return;
    } else if (!(await this.props.server.userExists(this.state.username))) {
      this.setState({ usernameError: 'Username not taken.' });
      return;
    }

    if (this.state.password === '') {
      this.setState({ passwordError: 'Invalid password.' });
      return;
    } else if (!(await this.props.server.verifyPassword(this.state.username, this.state.password))) {
      this.setState({ loginConfirmError: 'Incorrect password.' });
      return;
    }

    this.props.goHome();
  }

  handlePasswordClick() {
    this.setState({
      hidePassword: !this.state.hidePassword,
    });
  }

  renderUsername() {
    return (
      <FormControl error={this.state.usernameError}>
        <InputLabel>Username</InputLabel>
        <Input
          className='input'
          id='standard-basic'
          value={this.state.username}
          onClick={ () => this.handleInputClick('username') }
          onChange={e => this.handleText('username', e.target.value)}/>
        <FormHelperText color='secondary'>{this.state.usernameError ? this.state.usernameError : ' '}</FormHelperText>
      </FormControl>
    );
  }

  renderPassword() {
    return (
      <FormControl error={this.state.passwordError}>
        <InputLabel>Password</InputLabel>
        <Input
          className='input'
          error={this.state.passwordError}
          id='standard-basic'
          type={this.state.hidePassword ? 'password' : 'text'}
          value={this.state.password}
          helperText={this.state.passwordError}
          onClick={ () => this.handleInputClick('password') }
          onChange={e => this.handleText('password', e.target.value)}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton onClick={this.handlePasswordClick}>
                {this.state.hidePassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>}/>
        <FormHelperText color='secondary'>{this.state.passwordError ? this.state.passwordError : ' '}</FormHelperText>
      </FormControl>
    );
  }

  render() {
    return (
      <div className='LoginSignup'>
        {this.renderUsername()}

        <br/><br/>

        {this.renderPassword()}

        <br/><br/>

        <Button
          className='button'
          variant={this.state.loginButtonHover ? 'contained' : 'outlined'}
          color='primary'
          onClick={this.handleLoginClick}
          onMouseEnter={ () => this.handleHover('login') }
          onMouseLeave={ () => this.handleHover('login') }>
            Login
        </Button>

        <br/><br/>

        <Button
          className='button'
          variant={this.state.signupButtonHover ? 'outlined' : ''}
          color='primary'
          onClick={this.props.goSignup}
          onMouseEnter={ () => this.handleHover('signup') }
          onMouseLeave={ () => this.handleHover('signup') }>
            Sign up
        </Button>
      </div>
    );
  }
}

export default Login;
