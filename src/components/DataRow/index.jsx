import React from 'react';
import PropTypes from 'prop-types';

const DataRow  = ({item}) => {
  const getRequestStatusClassName = (status) => {
    let newStatus = 'data-row__status--approved';
    newStatus = (status === 'Open') ? 'data-row__status--open' : newStatus;
    newStatus = (status === 'Rejected') ? 'data-row__status--rejected' : newStatus;
    newStatus = (status === 'Verified') ? 'data-row__status--verified' : newStatus;
    return newStatus;
  };

  return (
    <React.Fragment>
      <div className="data-row">
        <div className="data-row__id">{item.id}</div>
        <div className="data-row__content">{item.destination}</div>
        <div className="data-row__content">{item.duration}</div>
        <div className={`${getRequestStatusClassName(item.status)} data-row__status`}>{item.status}</div>
      </div>
    </React.Fragment>
  );
};

DataRow.propTypes = {
  item: PropTypes.object,
};

DataRow.defaultProps = {
  item: {}
};

export default DataRow;
