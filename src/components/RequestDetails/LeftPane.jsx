import React from 'react';
import PropTypes from 'prop-types';
import Trips from './Trips';
import InfoCenter from './InfoCenter';

const LeftPane = ({ request }) => {
  const { trips } = request;
  return (
    <div className="left-pane">
      <InfoCenter request={request} />
      <Trips trips={trips} />
    </div>
  );
};

LeftPane.propTypes = {
  request: PropTypes.object.isRequired
};

export default LeftPane;
