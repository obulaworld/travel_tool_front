import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PageHeader from '../../components/PageHeader';
import ReadinessTable from './TravelReadinessDocumentsTable';
import './TravelReadinessDocuments.scss';
import { fetchAllUsersReadinessDocuments } from '../../redux/actionCreator/travelReadinessDocumentsActions';

class TravelReadinessDocuments extends Component {
  state = {};

  componentDidMount() {
    const { fetchUsers } = this.props;
    fetchUsers();
  }

  render() {
    const { users, isLoading } = this.props;
    return (
      <Fragment>
        <div className="readiness-header">
          <PageHeader
            title="TRAVEL READINESS"
          />
        </div>
        <ReadinessTable isLoading={isLoading} users={users} />
      </Fragment>
    );
  }
}

const mapStateToProps = ({travelReadinessDocuments}) => ({
  users: travelReadinessDocuments.users,
  isLoading: travelReadinessDocuments.isLoading,
});

const mapDispatchToProps = {
  fetchUsers: fetchAllUsersReadinessDocuments,
};

TravelReadinessDocuments.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelReadinessDocuments);
