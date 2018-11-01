import { PieChart, Pie, Cell } from 'recharts';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

export default class AnalyticsCard extends Component {
  static defaultProps = {
    data: [],
    icon: '',
    stats: 0,
    color: '',
    chart: false
  }

  renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name, fill }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (radius + 10) * cos;
    const sy = cy + (outerRadius - 10) * sin;
    const mx = cx + (outerRadius + 5) * cos;
    const my = cy + (outerRadius + 5) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 5;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke="#4F4F4F" fill="none" strokeDasharray="5,1" />
        <circle cx={ex} cy={ey} r={2} fill="#4F4F4F" stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 10} y={ey} textAnchor={textAnchor} fill="#4F4F4F" className="label">
          {`${(percent * 100).toFixed(2)}% [${name}]`}
        </text>
      </g>
    );
  }

  render() {
    const {icon, title, stats, color, data, chart } = this.props;
    return (
      <div className="analytics-card">
        <h3 className="analytics-card__title">{title}</h3>
        { chart ? (
          data.length > 0 ? (
            <PieChart width={800} height={400}>
              <Pie
                isAnimationActive={false}
                data={data} cx={145} cy={75}
                outerRadius={50} fill="#8884d8"
                label={this.renderCustomizedLabel}
                labelLine={false}
              />
            </PieChart>
          ) : (
            <div className="chart-data">
              <p className="no-chart">No data to display</p>
            </div>
          )
        ) : (
          <div className={`analytics-card__stats ${color}`}>
            <div className="analytics-card__icon">
              <img src={icon} alt="" />
            </div>
            <div className="analytics-card__stat">
              <h4>{stats}</h4>
            </div>
          </div>
        )}
      </div>
    );
  }
}

AnalyticsCard.propTypes = {
  data: PropTypes.array,
  chart: PropTypes.bool,
  icon: PropTypes.string,
  color: PropTypes.string,
  stats: PropTypes.number,
  title: PropTypes.string.isRequired
};
