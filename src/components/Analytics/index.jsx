import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';

import flightIcon from '../../images/icons/flight.svg';
import bookmark from '../../images/icons/calendar_icon.svg';
import AnalyticsCard from '../AnalyticsCard';
import './index.scss';


const data = {
  labels: [
    'Red',
    'Green',
    'Yellow',
    'Blue'
  ],
  datasets: [{
    data: [300, 50, 100, 75],
    backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#000'
    ],
    hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#000'
    ]
  }]
};


export default class Analytics extends Component {
  render() {
    return (
      <div className="analytics">
        <AnalyticsCard
          stat={128}
          title="Total No. of Travel Requests"
          icon={flightIcon}
        />
        <AnalyticsCard
          stat={6}
          title="Total Number of Pending Requests"
          icon={flightIcon}
        />
        <AnalyticsCard
          title="Average Travel Duration"
          data={data}
        />
        <AnalyticsCard
          stat={20}
          title="Total Number of Pending Requests"
          icon={flightIcon}
          color="green"
        />
        <AnalyticsCard
          stat={13}
          title="Total Number of Pending Requests"
          icon={flightIcon}
          color="brown-orange"
        />
        <AnalyticsCard
          title="Average Travel RequestLead Time"
          data={data}
        />
      </div>
    );
  }
}
