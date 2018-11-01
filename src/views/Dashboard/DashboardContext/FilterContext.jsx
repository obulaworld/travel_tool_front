import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export const { Consumer, Provider } = React.createContext();

export default class FilterContext extends Component {
  constructor(props) {
    super(props);
    const start = moment().startOf('isoWeek').format('YYYY-MM-DD');
    const end = moment().endOf('isoWeek').format('YYYY-MM-DD');
    this.state = {
      filter: 'This Week',
      range: {start, end}
    };
  }

  updateDateFilter = (start, end=start) => {
    return this.setState({range: {start, end} });
  }

  handleFilter = filter => {
    this.setState({filter});
    switch (filter) {
    case 'Today': {
      const date = moment().format('YYYY-MM-DD');
      this.updateDateFilter(date);
      break;
    }
    case 'Tomorrow': {
      const date = moment(new Date()).add(1,'days').format('YYYY-MM-DD');
      this.updateDateFilter(date);
      break;
    }
    case 'This Month': {
      const start = moment().startOf('month').format('YYYY-MM-DD');
      const end = moment().endOf('month').format('YYYY-MM-DD');
      this.updateDateFilter(start, end);
      break;
    }
    default: {
      const start = moment().startOf('isoWeek').format('YYYY-MM-DD');
      const end = moment().endOf('isoWeek').format('YYYY-MM-DD');
      this.updateDateFilter(start, end);
      break;
    }}
  }

  render() {
    const { children } = this.props;
    const context = {
      state: {...this.state},
      handleFilter: this.handleFilter
    };

    return (
      <Provider value={{ ...context }}>
        { children }
      </Provider>
    );
  }
}

FilterContext.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
