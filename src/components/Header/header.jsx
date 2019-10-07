import logo from "../../styling/logo.png";
import React from "react";
import '../../styling/App.css';

const Header = () => {
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Welcome to Mi-Pi Cloud</p>
        </header>
      </div>
  );
};

export default Header;