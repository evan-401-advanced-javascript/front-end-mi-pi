// AUth context provider, create methods and data required for Authorization

import React from 'react';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';

require('dotenv').config();


export const LoginContext = React.createContext();

const API = process.env.REACT_APP_API;

class LoginProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // all the auth data we want to pass to children
      loggedIn: false,
      token: null,
      user: {},
      login: this.login,
      logout: this.logout,
    };
  }

  // login
  login = (username, password, type) => {
    const options = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: new Headers({
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      }),
    };

    if (type === 'signup') {
      options.body = JSON.stringify({ username, password });
      options.headers = new Headers({
        'Content-Type': 'application/json',
      });
    }

    fetch(`${API}/${type}`, options)
      .then((response) => response.text())
      .then((token) => this.validateToken(token))
      .catch(console.error); // eslint-disable-line
  };

  // logout
  logout = () => {
    this.setLoginState(false, null, {});
  };

  // validate Token
  validateToken = (token) => {
    try {
      // console.log('token', token); // eslint-disable-line
      const user = jwt.verify(token, process.env.REACT_APP_SECRET);
      // console.log('user', user); // eslint-disable-line
      this.setLoginState(true, user, token);
    } catch (e) {
      this.setLoginState(false, null, {});
    }
  }

  // state handling
  setLoginState = (loggedIn, user, token) => {
    cookie.save('auth', token);
    this.setState({ token, loggedIn, user });
  }

  componentDidMount() {
    // when component is born: validate tokens. set cookies.
    const cookieToken = cookie.load('auth');
    this.validateToken(cookieToken);
  }
  /*eslint-disable */
  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
  /* eslint-enable */
}

export default LoginProvider;
