import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserRequestDetails } from '../../../redux/actionCreator/requestActions';
import Preloader from '../../../components/Preloader/Preloader';
import RequestDetailsPage from '../../../components/RequestsModal/RequestDetails';
import backButton from '../../../images/back-icon.svg';
import './NewRequestPage.scss';

export class NewRequestPage extends Component {
  componentDidMount() {
    const { fetchUserRequestDetails, match: { params: { requestId } } } = this.props;
    fetchUserRequestDetails(requestId);
  }

  render() {
    const { match:{ params: { requestId } },
      requestData,
      fetchingRequest,
      currentUser,
      user } = this.props;
    return (
      <Fragment>
        <div>
          <h1 className="page-header__request">
            <Link to="/requests">
              <img src={backButton} className="header__link" alt="back icon" />
            </Link>
            <span>
              {`REQUEST #${requestId}`}
            </span>
          </h1>
        </div>
        {fetchingRequest ? <Preloader /> :
          (
            <RequestDetailsPage
              fetchingRequest={fetchingRequest}
              requestData={requestData}
              requestId={requestId}
              currentUser={currentUser}
              user={user}
            />
          )
        }
      </Fragment>
    );
  }
}

NewRequestPage.propTypes = {
  fetchUserRequestDetails: PropTypes.func,
  match: PropTypes.object.isRequired,
  requestData: PropTypes.object,
  fetchingRequest: PropTypes.bool,
  currentUser: PropTypes.object,
  user: PropTypes.object,
};


NewRequestPage.defaultProps = {
  fetchUserRequestDetails: () => { },
  requestData: {},
  fetchingRequest: false,
  currentUser: {},
  user: {}
};

const mapStateToProps = ({ requests }) => {
  return {
    requestData: requests.requestData,
    fetchingRequest: requests.fetchingRequest,
  };
};

const actionCreators = { fetchUserRequestDetails };

export default connect(mapStateToProps, actionCreators)(NewRequestPage);
