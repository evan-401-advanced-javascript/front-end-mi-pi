// Conditionally rendered component wrapper
import React from 'react';
import { LoginContext } from './context';

const If = (props) => {
  return props.condition ? props.children : null;
};

class Auth extends React.Component {
  static contextType = LoginContext;

  render() {
    let okToRender = false;
    try {
      if (this.props.capability) { // eslint-disable-line
        if (this.context.user.capabilities.includes(this.props.capability)) { // eslint-disable-line
          okToRender = true;
        }
      }
    } catch (e) {
      console.warn('Not Authorized'); // eslint-disable-line
    }
    /*eslint-disable */
    return (
      <If condition={okToRender}>
        <div>{this.props.children }</div>
      </If>
    );
  }
}
/* eslint-enable */


export default Auth;
