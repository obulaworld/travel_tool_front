import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import moment from 'moment';
import store from '../../redux/store/store';
import './App.scss';
import Routes from '../../routes/index';
import '../../../node_modules/material-design-lite/material';
import '../../../node_modules/toastr/build/toastr.min.css';
import '../../../node_modules/material-design-icons';

// Calender settings
moment.updateLocale('en', {
  week: {
    dow: 1
  }
});

class App extends Component {
  render() {
    return (
      <div className="App-container">
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
