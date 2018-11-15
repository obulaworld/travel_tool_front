import React from 'react';
import PropTypes from 'prop-types';

const StatsAnalytics = ({color, stats, icon}) => (
  <div className={`analytics-card__stats ${color}`}>
    <div className="analytics-card__icon">
      <img src={icon} alt="" />
    </div>
    <div className="analytics-card__stat">
      <h4>{stats}</h4>
    </div>
  </div>
);

StatsAnalytics.propTypes = {
  color: PropTypes.string,
  stats: PropTypes.number,
  icon: PropTypes.string,
};

StatsAnalytics.defaultProps = {
  color: '',
  icon: '',
  stats: 0
};

export default StatsAnalytics;
