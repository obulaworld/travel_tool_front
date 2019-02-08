import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import PageHeader from '../../components/PageHeader';
import ReadinessTable from './TravelReadinessDocumentsTable';
import './TravelReadinessDocuments.scss';
import { fetchAllUsersReadinessDocuments } from '../../redux/actionCreator/travelReadinessDocumentsActions';

class TravelReadinessDocuments extends Component {
  state = {};

  componentDidMount() {
    const { fetchUsers, location: { search } } = this.props;
    let searchParams = search.split('=')[1];
    if(!searchParams) searchParams = '';
    fetchUsers(searchParams);
  }

  render() {
    const { users, isLoading } = this.props;
    const body = isEmpty(users)
      ? <h1 id="no-results">No records found</h1>
      : <ReadinessTable isLoading={isLoading} users={users} />;
    return (
      <Fragment>
        <div className="readiness-header">
          <PageHeader
            title="TRAVEL READINESS"
          />
        </div>
        {body}
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
  location: PropTypes.object.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(TravelReadinessDocuments);
