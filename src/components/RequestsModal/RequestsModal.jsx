import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Oval2 from '../../images/Oval2.png';
import ConnectedCommentBox from './CommentBox/CommentBox';
import ImageLink from '../image-link/ImageLink';
import TravelLink from './_RequestTravel';
import { fetchUserRequestDetails } from '../../redux/actionCreator/requestActions';
import { updateRequestStatus } from '../../redux/actionCreator/approvalActions';
import './RequestsModal.scss';
import isCurrentPageMyApproval from '../../helper/isCurrentPageMyApproval';
import generateDynamicDate from '../../helper/generateDynamicDate';
import AddComment from './CommentBox/AddComment';

export class RequestDetailsModal extends Component {
  state = {
    approveColor: '',
    rejectColor: '',
    approveTextColor: '',
    rejectTextColor: '',
  };

  componentDidMount() {
    const { fetchUserRequestDetails, requestId } = this.props;
    fetchUserRequestDetails(requestId);
  }

  updateRequestStatus = () => {
    const { requestId, newStatus }= this.state;
    const { updateRequestStatus } = this.props;
    updateRequestStatus({requestId, newStatus});
  }

  handleButtonState = (approveColor, rejectColor, approveTextColor, rejectTextColor, newStatus, requestId) => {
    this.setState({
      approveColor,
      rejectColor,
      approveTextColor,
      rejectTextColor,
      newStatus,
      requestId }, () => this.updateRequestStatus());
  }

  handleApprove = (requestId) => {
    return () => {
      this.handleButtonState('#49AAAF', '', 'white', '','Approved', requestId);
    };
  };

  handleReject = (requestId) => {
    return () => {
      this.handleButtonState('', '#FF5359', '', 'white', 'Rejected', requestId);
    };
  };

  showButtons = (approveColor, rejectColor, approveTextColor, rejectTextColor, id) => { 
    return (
      [
        {
          id: 1,
          onClick: this.handleApprove(id),
          action: approveColor,
          actionText: approveTextColor,
          class: 'modal__button-submitted-text bg',
          text: 'Approve'
        },
        {
          id: 2,
          onClick: this.handleReject(id),
          action: rejectColor,
          actionText: rejectTextColor,
          class: 'modal__button-rejected-text',
          text: 'Reject'
        }
      ]);
  }

  formatDate(date) {
    const createdAt = moment(date).format('MM/DD/YYYY @ h:mm a');
    return moment(createdAt).fromNow();
  }

  renderUserInfo() {
    const { requestData, user } = this.props;
    return (
      <div>
        <div className="modal__user-info">
          <ImageLink
            imageSrc={user.picture}
            altText="avatar"
            imageClass="modal__oval"
          />
          <span className="modal__text-size">
            {requestData && requestData.name}
          </span>
          <div className="modal__modal3">
            {requestData && requestData.role}
,
            {requestData && requestData.department}
          </div>
        </div>
      </div>
    );
  }

  renderTravelInfo() {
    const { requestData } = this.props;
    return (
      <div className="modal__travel-place">
        <span className="modal__dialog1">
          Request to travel to:
          <span className="modal__city-name">
            {requestData && requestData.destination}
          </span>
        </span>
        <span className="modal__dialog-from">
          From:
          <span className="modal__city-name">
            {requestData && requestData.origin}
          </span>
        </span>
      </div>
    );
  }

  renderRequestInfo() {
    const { requestData } = this.props;
    const { createdAt, departureDate, arrivalDate } = requestData;
    return (
      <div className="modal__modal-date">
        <TravelLink 
          divClass="modal__travel-date" innerClass="modal__travel-dates" 
          dynamicText="Date submitted" nextClass="modal__date-text" dynamicDate={generateDynamicDate(requestData, createdAt)} />
        <TravelLink 
          divClass="modal__travel-date" innerClass="modal__travel-dates" 
          dynamicText="Target depature date" nextClass="modal__date-text" dynamicDate={generateDynamicDate(requestData, departureDate)} />

        <TravelLink 
          divClass="modal__travel-date" innerClass="modal__travel-dates" 
          dynamicText="Target return date" nextClass="modal__date-text" dynamicDate={generateDynamicDate(requestData, arrivalDate)} />
      </div>
    );
  }

  renderButtons() {
    const { approveColor, rejectColor, approveTextColor, rejectTextColor } = this.state;
    const { requestData } = this.props;
    const { id } = requestData;
    let displayButtons = this.showButtons(approveColor, rejectColor, approveTextColor, rejectTextColor, id)
      .map((button)=>{
        return (
          <span key={button.id}>
            <span className="modal__dialog-btn">
              <button
                style={{backgroundColor: `${button.action}`, color: `${button.actionText}`}}
                onClick={button.onClick} className={button.class} id={'b'+button.id} type="button"
                disabled={!isCurrentPageMyApproval()}
              >
                {button.text}
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

  renderRequestAprroval() {
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

  renderUserComments() {
    const { requestData: { comments } } = this.props;
    return comments && comments.reverse().map((comment) => {
      return (
        <div className="modal__modal1" key={comment.id}>
          <hr />
          <div className="modal__mdl-icons">
            <ImageLink imageSrc={comment.picture} altText="avatar" imageClass="modal__oval-copy" />
            <span className="modal__user-name">
              { comment.userName }
            </span>
            <span className="modal__hours-status">
              {this.formatDate(comment.createdAt)}
            </span>
            <span className="modal__dialog">
              <button type="button" className="modal__delete-btn">
                Delete
              </button>
            </span>
            <div className="modal__modal2">
              <div className="modal__status-update" dangerouslySetInnerHTML={{ __html: comment.comment }} /> {/*eslint-disable-line*/}
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    const { requestId, requestData } = this.props;
    return (
      <Fragment>
        {this.renderUserInfo()}
        {this.renderTravelInfo()}
        {this.renderRequestInfo()}
        {this.renderButtons()}
        <AddComment />
        <ConnectedCommentBox requestId={requestId} />
        {(requestData && requestData.status) === 'Approved' && this.renderRequestAprroval()}
        <div id="comments">
          {this.renderUserComments()}
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
  requestData: PropTypes.object

};

RequestDetailsModal.defaultProps = {
  fetchUserRequestDetails: () => {},
  updateRequestStatus: () => {},
  requestId: '',
  requestData: {},
  user: {}
};

const mapStateToProps = (state) => {
  return {
    requestData: state.requests.requestData,
    user: state.auth.user.UserInfo
  };
};

const actionCreators = {
  fetchUserRequestDetails,
  updateRequestStatus
};

export default connect(mapStateToProps, actionCreators)(RequestDetailsModal);

