import React, { Component } from 'react';
import {connect} from 'react-redux';

import './home.scss';
import PageHeader from '../../components/PageHeader';

const DataRow  = ({item}) => (
  <React.Fragment>
    <tr>
      <td className="mdl-data-table__cell--non-numeric req-id">{item.id}</td>
      <td>{item.destination}</td>
      <td>{item.duration}</td>
      <td className="request__status--" style={{ height: '5px' }}>{item.status}</td>
    </tr>
  </React.Fragment>
);

class Home extends Component {
  render() {
    const data = [
      {
        id: '745923RTF',
        destination: 'Nairobi',
        duration: '3 days',
        status: 'Approved'
      },
      {
        id: '745923RTG',
        destination: 'Nairobi',
        duration: '3 days',
        status: 'Approved'
      },
      {
        id: '745923RTH',
        destination: 'Nairobi',
        duration: '3 days',
        status: 'Rejected'
      },
      {
        id: '745923RTI',
        destination: 'Nairobi',
        duration: '3 days',
        status: 'Approved'
      },
    ];
    return (
      <div>
        <h1 className="home-title">HOME</h1>
        <div className="home">
          <div className="started">
            <div className="card-layout card-layout--start">
              <div className="photo">Image</div>
              <div className="details">
                <p className="ready">Get Travel Ready</p>
                <p className="confirm">
                Confirm you have all the required travel documents today and avoid last minute hassle.
                </p>
                <a href="#!">Get Started</a>
              </div>
            </div>
          </div>
          <div className="overview">
            <div className="card-layout card-layout--team">
              <p>Travelling team Members</p>
              <div className="team-members">
                <img src="https://randomuser.me/api/portraits/med/men/53.jpg" alt="username" />
                <img src="https://randomuser.me/api/portraits/med/women/32.jpg" alt="username" />
                <img src="https://randomuser.me/api/portraits/med/men/35.jpg" alt="username" />
                <img src="https://randomuser.me/api/portraits/med/women/32.jpg" alt="username" />
                <img src="https://randomuser.me/api/portraits/med/women/24.jpg" alt="username" />
                <img src="https://randomuser.me/api/portraits/med/men/34.jpg" alt="username" />
                <img src="https://randomuser.me/api/portraits/med/women/23.jpg" alt="username" />
              </div>
            </div>
            <div className="card-layout card-layout--requests">
              <div className="card-layout--requests__header">
                <p>Your Requests</p>
                <u><a href="#!">View All</a></u>
              </div>

              <table className="mdl-data-table card-layout--requests-table mdl-js-data-table ">
                <thead>
                  <tr className="card-layout--requests-table__header">
                    <th className="mdl-data-table__cell--non-numeric">Request ID</th>
                    <th>Destination</th>
                    <th>Duration</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => <DataRow key={item.id} item={item} /> ) }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => ({state}))(Home);
