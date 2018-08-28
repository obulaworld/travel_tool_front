import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './_headerPagination.scss';
import SelectDropDown from '../SelectDropDown/SelectDropDown';

const numberLimits = [
  {
    name: '10',
    value: 10,
  },
  {
    name: '20',
    value: 20,
  },
  {
    name: '30',
    value: 30,
  },
];
class HeaderPagination extends PureComponent {
  render() {
    const { getRequestsWithLimit } = this.props;
    return (
      <div className="cell-items-per-page">
        <div className="cell-items-per-page-text">
          <span className="items-per-page-text">
            Items per page
          </span>
        </div>
        <div className="items-per-page-paginator">
          <SelectDropDown
            onClickItem={getRequestsWithLimit}
            dropDownItems={numberLimits}
          />
        </div>
      </div>
    );
  }
}

HeaderPagination.propTypes = {
  getRequestsWithLimit: PropTypes.func,
};
HeaderPagination.defaultProps = {
  getRequestsWithLimit: null,
};

export default HeaderPagination;
