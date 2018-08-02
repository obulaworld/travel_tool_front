import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../../redux/store/store';
import Routes from '../../routes/index';
import '../../../node_modules/material-design-lite/material';


class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <Routes />  
          </BrowserRouter>
        </Provider> 
      </div>
    );
  }
}


export default App;
