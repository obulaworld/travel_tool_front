import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Oval2 from '../../images/Oval2.png';
import ConnectedCommentBox from './CommentBox/CommentBox';
import ImageLink from '../image-link/ImageLink';
import { fetchUserRequestDetails } from '../../redux/actionCreator/requestActions';
import { updateRequestStatus } from '../../redux/actionCreator/approvalActions';
import './RequestsModal.scss';
import AddComment from './CommentBox/AddComment';
import ConnectedUserComments from './UserComments/UserComments';
import UserInfo from './UserInfo/UserInfo';
import TripDetails from './TripDetails';
import RequestDetailsHeader from './RequestDetailsHeader';

export class RequestDetailsModal extends Component {
  state = {
    approveColor: '',
    rejectColor: '',
    approveTextColor: '',
    rejectTextColor: '',
    buttonSelected: false,
    approvalText: 'Approve',
    rejectText: 'Reject'
  };

  componentDidMount() {
    const { fetchUserRequestDetails, requestId } = this.props;
    fetchUserRequestDetails(requestId);
  }

  getRequestTripsDetails = (requestData) => {
    const {trips, tripType, createdAt} = requestData;
    const requestTripsDetails = trips && trips.map(trip => {
      const tripDetails = { createdAt, tripType, ...trip, };
      return <TripDetails key={trip.id} tripDetails={tripDetails} />;
    });
    return requestTripsDetails;
  }

  handleButtonState = (approvalText, rejectText, buttonSelected, approveColor, rejectColor, approveTextColor, rejectTextColor, newStatus, requestId) => {
    this.setState({
      approvalText,
      rejectText,
      approveColor,
      rejectColor,
      approveTextColor,
      rejectTextColor,
      buttonSelected,
      newStatus,
      requestId }, () => this.updateRequestStatus());
  }

  changeButtonColor = (button, status) => {
    const { approveTextColor, rejectTextColor } = this.state;
    const style = {
      color: 'white'
    };
    const approvedCondition = approveTextColor && button.id === 1 && !rejectTextColor;
    const rejectCondition = rejectTextColor && button.id === 2 && !approveTextColor;

    if ((status === 'Approved' && button.id === 1) || approvedCondition) {
      style.backgroundColor = '#49AAAF';
      return style;
    } else if ((status === 'Rejected' && button.id === 2) || rejectCondition) {
      style.backgroundColor = '#FF5359';
      return style;
    } else {
      style.color = 'black';
      style.backgroundColor = 'white';
      return style;
    }
  }

  handleApprove = (requestId) => {
    return () => {
      this.handleButtonState('Approved','Reject',true,'#49AAAF', '', 'white', '','Approved', requestId);
    };
  };

  handleReject = (requestId) => {
    return () => {
      this.handleButtonState('Approve', 'Rejected', true, '', '#FF5359', '', 'white', 'Rejected', requestId);
    };
  };

  showButtons = (approveColor, rejectColor, approveTextColor, rejectTextColor, id) => {
    const { approvalText, rejectText } =  this.state;
    return (
      [
        {
          id: 1,
          onClick: this.handleApprove(id),
          action: approveColor,
          actionText: approveTextColor,
          class: 'modal__button-submitted-text bg',
          text: approvalText
        },
        {
          id: 2,
          onClick: this.handleReject(id),
          action: rejectColor,
          actionText: rejectTextColor,
          class: 'modal__button-rejected-text',
          text: rejectText
        }
      ]);
  }

  updateRequestStatus = () => {
    const { requestId, newStatus }= this.state;
    const { updateRequestStatus } = this.props;
    updateRequestStatus({requestId, newStatus});
  }


  disableButtons(status, page) {
    const { buttonSelected } = this.state;
    const { isStatusUpdating } = this.props;
    return page === 'Requests' ||
      page === 'Approvals' && (status && ['Approved', 'Rejected'].includes(status)) ||
      isStatusUpdating || buttonSelected;
  }
  shouldButtonsRender(status) {
    const { navigatedPage } = this.props;
    if (navigatedPage === 'Requests' && (status === 'Open' ||'Approved' || 'Rejected')) return this.renderStatusAsBadge(status);
    else return this.renderButtons();
  }

  renderButtonText(status, text) {
    return status && status.includes(text) ? status : text;
  }

  renderStatusAsBadge(status) {
    const style = `request__status--${!status ? '' : status.toLowerCase()}`;
    return (
      <div className="modal__button-below">
        <span className={style}>
          {status}
        </span>
      </div>
    );
  }

  renderRequestDetailsHeader = () => {
    const {requestData} = this.props;
    return <RequestDetailsHeader requestData={requestData} />;
  }

  renderButtons = () => {
    const { approveColor, rejectColor, approveTextColor, rejectTextColor } = this.state;
    const { requestData: { id, status }, navigatedPage } = this.props;
    let displayButtons = this.showButtons(approveColor, rejectColor, approveTextColor, rejectTextColor, id)
      .map((button)=>{
        const buttonStyle = this.changeButtonColor(button, status);
        return (
          <span key={button.text}>
            <span className="modal__dialog-btn">
              <button
                style={{
                  backgroundColor: `${buttonStyle.backgroundColor}`,
                  color: `${buttonStyle.color}`, cursor: status === 'Open' ? 'Pointer' : ''
                }}
                onClick={button.onClick}
                className={button.class}
                id={`b${button.id}`}
                type="button"
                disabled={this.disableButtons(status, navigatedPage)}
              >
                {this.renderButtonText(status, button.text)}
              </button>
            </span>
          </span>
        );
      });

    return (
      <div className="modal__button-below">
        {displayButtons}
      </div>
    );
  }

  renderRequestAprroval = () => {
    const { requestData } = this.props;
    return (
      <div className="modal__modal1">
        <span className="modal__mdl-icons">
          <ImageLink
            imageSrc={Oval2}
            altText="avatar"
            imageClass="modal__oval-copy" />
          <span className="modal__user-name">
            {requestData && requestData.manager}
          </span>
          <span className="modal__approval-status">
          approved your travel request.
          </span>
          <span className="modal__hours-status">
           5 hours ago
          </span>
        </span>
      </div>
    );
  }

  render() {
    const { requestId, requestData, user, email } = this.props;
    const { status, comments } = requestData;
    const { picture } = user;
    return (
      <Fragment>
        <div style={{display:'flex', flexWrap:'wrap', justifyContent: 'space-between'}}>
          <UserInfo
            requestData={requestData}
            user={user}
          />
          {this.shouldButtonsRender(status)}
        </div>
        <div className="request-details">
          {this.renderRequestDetailsHeader(requestData)}
          {this.getRequestTripsDetails(requestData)}
        </div>
        <AddComment
          image={picture}
        />
        <ConnectedCommentBox requestId={requestId} />
        {(requestData && status) === 'Approved' && this.renderRequestAprroval()}
        <div id="comments">
          <ConnectedUserComments comments={comments} email={email} />
        </div>
      </Fragment>
    );
  }
}

RequestDetailsModal.propTypes = {
  fetchUserRequestDetails: PropTypes.func,
  updateRequestStatus: PropTypes.func,
  requestId: PropTypes.string,
  user: PropTypes.object,
  requestData: PropTypes.object,
  isStatusUpdating: PropTypes.bool,
  navigatedPage: PropTypes.string,
  email:PropTypes.string
};

RequestDetailsModal.defaultProps = {
  fetchUserRequestDetails: () => {},
  updateRequestStatus: () => {},
  requestId: '',
  requestData: {},
  user: {},
  isStatusUpdating: false,
  navigatedPage: '',
  email: ''
};

const mapStateToProps = (state) => {
  return {
    requestData: state.requests.requestData,
    user: state.auth.user.UserInfo,
    isStatusUpdating: state.approvals.updatingStatus,
    email:state.user.getUserData.result.email,
    ...state.modal.modal
  };
};

const actionCreators = {
  fetchUserRequestDetails,
  updateRequestStatus
};

export default connect(mapStateToProps, actionCreators)(RequestDetailsModal);
