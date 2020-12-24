import React from 'react';
import { Redirect } from 'react-router-dom'

import Button         from '@material-ui/core/Button';
import IconButton     from '@material-ui/core/IconButton';
import Input          from '@material-ui/core/Input';
import InputLabel     from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl    from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography     from '@material-ui/core/Typography';

import Visibility     from '@material-ui/icons/Visibility';
import VisibilityOff  from '@material-ui/icons/VisibilityOff';

import './LoginSignup.css';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username:      '',
      password:      '',

      usernameError: '',
      passwordError: '',

      hidePassword:      true,
      loginButtonHover:  false,
      signupButtonHover: false,
    };

    if (localStorage.getItem('username')) {
      this.props.logIn(localStorage.getItem('username'));
      this.setState({ leavePage: '/' });
    }

    this.handleText          = this.handleText.bind(this);
    this.handleHover         = this.handleHover.bind(this);
    this.handleKeyPress      = this.handleKeyPress.bind(this);
    this.handleLoginClick    = this.handleLoginClick.bind(this);
    this.handlePasswordClick = this.handlePasswordClick.bind(this);
  }

  async componentDidMount() {
    if (await this.props.isValid()) {
      this.setState({ leavePage: '/' });
    }
  }

  handleText(type, value) {
    this.setState({
      [type]: value,
      usernameError: type === 'username' ? false : this.state.usernameError,
      passwordError: type === 'password' ? false : this.state.passwordError,
    });
  }

  handleInputClick(type) {
    this.setState({
      usernameError: type === 'username' ? false : this.state.usernameError,
      passwordError: type === 'password' ? false : this.state.passwordError,
    });
  }

  handleHover(type, pos) {
    this.setState({
      loginButtonHover:  type === 'login'  ? (pos === 'on' ? true : false) : this.state.loginButtonHover,
      signupButtonHover: type === 'signup' ? (pos === 'on' ? true : false) : this.state.signupButtonHover,
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleLoginClick();
    }
  }

  async handleLoginClick() {
    if (this.state.username === '') {
      this.setState({ usernameError: 'Invalid username.' });
      return;
    } else if (!(await this.props.server.userExists(this.state.username))) {
      this.setState({ usernameError: 'Username does not exist.' });
      return;
    }

    if (this.state.password === '') {
      this.setState({ passwordError: 'Invalid password.' });
      return;
    } else if (!(await this.props.server.verifyPassword(this.state.username, this.state.password))) {
      this.setState({ passwordError: 'Incorrect password.' });
      return;
    }

    await this.props.logIn(this.state.username);
    this.setState({ leavePage: '/' });
  }

  handlePasswordClick() {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  renderUsername() {
    return (
      <FormControl error={this.state.usernameError}>
        <InputLabel>Username</InputLabel>
        <Input
          className='input'
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

  renderLoginButton() {
    return (
      <Button
        className='button'
        variant={this.state.loginButtonHover ? 'contained' : 'outlined'}
        color='primary'
        onClick={this.handleLoginClick}
        onMouseEnter={ () => this.handleHover('login', 'on') }
        onMouseLeave={ () => this.handleHover('login', 'off') }>
          Login
      </Button>
    );
  }

  renderSignupButton() {
    return (
      <Button
        className='button'
        variant={this.state.signupButtonHover ? 'outlined' : ''}
        color='primary'
        onClick={ () => this.setState({ leavePage: 'signup' }) }
        onMouseEnter={ () => this.handleHover('signup', 'on') }
        onMouseLeave={ () => this.handleHover('signup', 'off') }>
          Sign Up
      </Button>
    );
  }

  render() {
    if (this.state.leavePage) {
      return <Redirect to={this.state.leavePage} />;
    }

    return (
      <div className='LoginSignup' onKeyPress={this.handleKeyPress}>
        <Typography variant='h5'>
          LOGIN
        </Typography>

        <br/>

        {this.renderUsername()}

        <br/><br/>

        {this.renderPassword()}

        <br/><br/>

        {this.renderLoginButton()}

        <br/><br/>

        {this.renderSignupButton()}

      </div>
    );
  }
}

export default Login;
