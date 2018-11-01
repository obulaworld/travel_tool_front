import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import {Pie} from 'react-chartjs-2';
import {PieChart, Pie, Legend, Tooltip, Cell} from 'recharts';
import './index.scss';

export default class AnalyticsCard extends PureComponent {
  
  render() {
    const {icon, title, stat, color, data} = this.props;
    const data01 = [{name: 'Group A', value: 20}, {name: 'Group B', value: 70},
      {name: 'Group C', value: 10}];
    const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];
    return (
      <div className="analytics-card">
        <h3 className="analytics-card__title">{title}</h3>
        {data ? (
          <PieChart width={800} height={400}>
            <Pie isAnimationActive data={data01} cx={135} cy={70} outerRadius={55} fill="#8884d8" label>
              { data01.map((entry, index) => <Cell key={entry} fill={COLORS[index % COLORS.length]} />) }
            </Pie>
            <Tooltip />
          </PieChart>
        ) : (
          <div className={`analytics-card__stats ${color}`}>
            <div className="analytics-card__icon">
              <img src={icon} alt="" />
            </div>
            <div className="analytics-card__stat">
              <h4>{stat}</h4>
            </div>
          </div>
        )}
      </div>
    );
  }
}

AnalyticsCard.propTypes = {
  data: PropTypes.array.isRequired,
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  stat: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};
