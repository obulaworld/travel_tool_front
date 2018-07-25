
import React from 'react';
import logo from '../../images/logo.svg';

const AppHeader = () => {
    return(
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">
            Welcome to React
        </h1>
      </header>
    );
};
export default AppHeader;
