import React from 'react';
import { Redirect } from 'react-router-dom';

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

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username:      '',
      password:      '',
      confirm:       '',

      usernameError: '',
      passwordError: '',
      confirmError:  '',

      hidePassword:      true,
      hideConfirm:       true,
      signupButtonHover: false,
      loginButtonHover:  false,
    };

    if (localStorage.getItem('username')) {
      this.props.logIn(localStorage.getItem('username'));
      this.setState({ leavePage: '/' });
    }

    this.handleText          = this.handleText.bind(this);
    this.handleHover         = this.handleHover.bind(this);
    this.handleKeyPress      = this.handleKeyPress.bind(this);
    this.handleSignupClick   = this.handleSignupClick.bind(this);
    this.handlePasswordClick = this.handlePasswordClick.bind(this);
    this.handleConfirmClick  = this.handleConfirmClick.bind(this);
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
      confirmError:  type === 'confirm'  ? false : this.state.confirmError,
    });
  }

  handleInputClick(type) {
    this.setState({
      usernameError: type === 'username' ? false : this.state.usernameError,
      passwordError: type === 'password' ? false : this.state.passwordError,
      confirmError:  type === 'confirm'  ? false : this.state.confirmError,
    });
  }

  handleHover(type, pos) {
    this.setState({
      signupButtonHover: type === 'signup' ? (pos === 'on' ? true : false) : this.state.signupButtonHover,
      loginButtonHover:  type === 'login'  ? (pos === 'on' ? true : false) : this.state.loginButtonHover,
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSignupClick();
    }
  }

  async handleSignupClick() {
    if (this.state.username === '') {
      this.setState({ usernameError: 'Invalid username.' });
      return;
    } else if (await this.props.server.userExists(this.state.username)) {
      this.setState({ usernameError: 'Username already taken.' });
      return;
    }

    if (this.state.password === '') {
      this.setState({ passwordError: 'Invalid password.' });
      return;
    } else if (this.state.password !== this.state.confirm) {
      this.setState({ confirmError: 'Passwords don\'t match.' });
      return;
    }

    this.props.server.newUser(this.state.username, this.state.password);
    this.props.logIn(this.state.username);
    this.setState({ leavePage: '/' });
  }

  handlePasswordClick() {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  handleConfirmClick() {
    this.setState({ hideConfirm: !this.state.hideConfirm });
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

  renderConfirm() {
    return (
      <FormControl error={this.state.confirmError}>
        <InputLabel>Confirm Password</InputLabel>
        <Input
          className='input'
          error={this.state.confirmError}
          id='standard-basic'
          type={this.state.hideConfirm ? 'password' : 'text'}
          value={this.state.confirm}
          helperText={this.state.confirmError}
          onClick={ () => this.handleInputClick('confirm') }
          onChange={e => this.handleText('confirm', e.target.value)}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton onClick={this.handleConfirmClick}>
                {this.state.hideConfirm ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>}/>
        <FormHelperText color='secondary'>{this.state.confirmError ? this.state.confirmError : ' '}</FormHelperText>
      </FormControl>
    );
  }

  renderSignupButton() {
    return (
      <Button
        className='button'
        variant={this.state.signupButtonHover ? 'contained' : 'outlined'}
        color='primary'
        onClick={this.handleSignupClick}
        onMouseEnter={ () => this.handleHover('signup', 'on') }
        onMouseLeave={ () => this.handleHover('signup', 'off') }>
          Sign up
      </Button>
    );
  }

  renderLoginButton() {
    return (
      <Button
        className='button'
        variant={this.state.loginButtonHover ? 'outlined' : ''}
        color='primary'
        onClick={ () => this.setState({ leavePage: 'login' }) }
        onMouseEnter={ () => this.handleHover('login', 'on') }
        onMouseLeave={ () => this.handleHover('login', 'off') }>
          Login
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
          SIGN UP
        </Typography>

        <br/>

        {this.renderUsername()}

        <br/><br/>

        {this.renderPassword()}

        <br/><br/>

        {this.renderConfirm()}

        <br/><br/>

        {this.renderSignupButton()}

        <br/><br/>

        {this.renderLoginButton()}
      </div>
    );
  }
}

export default Signup;
