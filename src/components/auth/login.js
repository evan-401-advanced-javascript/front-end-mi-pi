// Auth Form for holding input values
import React from 'react';
import { LoginContext } from './context';
import '../../styling/login.css';

const If = (props) => {
  return props.condition ? props.children : null;
};

class Login extends React.Component {
  static contextType = LoginContext;

  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e, type) => {
    e.preventDefault();
    this.context.login(this.state.username, this.state.password, type);
  };

  render() {
    return (
      <>
        <If condition={this.context.loggedIn}>
          <button className="logout" onClick={this.context.logout}>Log Out</button>
        </If>

        <If condition={!this.context.loggedIn}>
          <form className="loginForm">
            <input
              placeholder="UserName"
              name="username"
              onChange={this.handleChange}
            />
            <input
              placeholder="password"
              name="password"
              type="password"
              onChange={this.handleChange}
            />
            <button onClick={(e) => this.handleSubmit(e, 'signin')}>Sign In</button>
            <button onClick={(e) => this.handleSubmit(e, 'signup')}>Sign Up</button>
          </form>
        </If>
      </>
    );
  }
}

export default Login;
