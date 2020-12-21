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

      hidePassword: true,
      hideConfirm:  true,
      signupButtonHover: false,
      loginButtonHover: false,
    }

    this.handleText          = this.handleText.bind(this);
    this.handleHover         = this.handleHover.bind(this);
    this.handleSignupClick   = this.handleSignupClick.bind(this);
    this.handlePasswordClick = this.handlePasswordClick.bind(this);
    this.handleConfirmClick  = this.handleConfirmClick.bind(this);
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
      confirmError:  type === 'confirm'  ? false : this.state.confirmError,
    });
  }

  handleHover(type) {
    this.setState({
      signupButtonHover: type === 'signup' ? !this.state.signupButtonHover : this.state.signupButtonHover,
      loginButtonHover: type === 'login' ? !this.state.loginButtonHover : this.state.loginButtonHover,
    });
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
    this.props.goHome();
  }

  handlePasswordClick() {
    this.setState({
      hidePassword: !this.state.hidePassword,
    });
  }

  handleConfirmClick() {
    this.setState({
      hideConfirm: !this.state.hideConfirm,
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

  render() {
    return (
      <div className='LoginSignup'>
        {this.renderUsername()}

        <br/><br/>

        {this.renderPassword()}

        <br/><br/>

        {this.renderConfirm()}

        <br/><br/>

        <Button
          className='button'
          variant={this.state.signupButtonHover ? 'contained' : 'outlined'}
          color='primary'
          onClick={this.handleSignupClick}
          onMouseEnter={ () => this.handleHover('signup') }
          onMouseLeave={ () => this.handleHover('signup') }>
            Sign up
        </Button>

        <br/><br/>

        <Button
          className='button'
          variant={this.state.loginButtonHover ? 'outlined' : ''}
          color='primary'
          onClick={this.props.goLogin}
          onMouseEnter={ () => this.handleHover('login') }
          onMouseLeave={ () => this.handleHover('login') }>
            Login
        </Button>
      </div>
    );
  }
}

export default Signup;
