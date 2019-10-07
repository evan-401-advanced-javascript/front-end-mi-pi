import React from 'react';

import Header from './components/Header/header'; // eslint-disable-line
import Login from './components/auth/login';
import LoginProvider from './components/auth/context';
import FileUpload from './components/file-server/file-upload';
import './styling/App.css';

class App extends React.Component {
  render() {
    return (
      <>
      <Header />
      <LoginProvider>
        <Login />
        <FileUpload />
      </LoginProvider>
      </>
    );
  }
}

export default App;
