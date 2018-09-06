import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import Oval2 from '../../images/Oval2.png';
import CommentBox from './CommentBox/CommentBox';
import ImageLink from '../image-link/ImageLink';
import TravelLink from './_RequestTravel';
import { fetchUserRequestDetails } from '../../redux/actionCreator/requestActions';
import './RequestsModal.scss';

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
  handleApprove = () => {
    this.setState({
      approveColor: '#49AAAF',
      rejectColor: '',
      approveTextColor: 'white',
      rejectTextColor: ''
    });
  };

  handleReject = () => {
    this.setState({
      rejectColor: '#FF5359',
      approveColor: '',
      rejectTextColor: 'white',
      approveTextColor: ''
    });
  };

  showButtons = (approveColor, rejectColor, approveTextColor, rejectTextColor) => { 
    
    return (
      [
        {
          id: 1,
          onClick: this.handleApprove,
          action: approveColor,
          actionText: approveTextColor,
          class: 'modal__button-submitted-text bg',
          text: 'Approve'
        },
        
        {
          id: 2,
          onClick: this.handleReject,
          action: rejectColor,
          actionText: rejectTextColor,
          class: 'modal__button-rejected-text',
          text: 'Reject'
        }
      ]);
  }

  generateDynamicDate = (date) => {
    const { requestData } = this.props;
    return requestData && moment(date).format('DD MMM YYYY');
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
    const { generateDynamicDate } = this;
    return (
      <div className="modal__modal-date">
        <TravelLink 
          divClass="modal__travel-date" innerClass="modal__travel-dates" 
          dynamicText="Date submitted" nextClass="modal__date-text" dynamicDate={generateDynamicDate(requestData.createdAt)} />
        <TravelLink 
          divClass="modal__travel-date" innerClass="modal__travel-dates" 
          dynamicText="Target depature date" nextClass="modal__date-text" dynamicDate={generateDynamicDate(requestData.departureDate)} />

        <TravelLink 
          divClass="modal__travel-date" innerClass="modal__travel-dates" 
          dynamicText="Target return date" nextClass="modal__date-text" dynamicDate={generateDynamicDate(requestData.arrivalDate)} />
      </div>
    );
  }

  renderButtons() {
    const { approveColor, rejectColor, approveTextColor, rejectTextColor } = this.state;

    let displayButtons = this.showButtons(approveColor, rejectColor, approveTextColor, rejectTextColor)
      .map((button)=>{
        return (
          <span key={button.id}>
            <span className="modal__dialog-btn">
              <button 
                style={{backgroundColor: `${button.action}`, color: `${button.actionText}`}} 
                onClick={button.onClick} className={button.class} id={'b'+button.id} type="button">
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

  renderAddComment() {
    return (
  
      <div className="modal__modal1">
        <span className="modal__oval-copy">
          <ImageLink
            imageSrc={Oval2}
            altText="avatar"
            imageClass="modal__oval-copy" />
        </span>
        <span className="modal__add-comment">
            Add a comment
        </span>

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
    return (
      <div className="modal__modal1">
        <hr />
        <div className="modal__mdl-icons">
          <ImageLink imageSrc={Oval2} altText="avatar" imageClass="modal__oval-copy" />
          <span className="modal__user-name">
          Jolomi Otumara.
          </span>
          <span className="modal__hours-status">
          5 hours ago
          </span>
          <span className="modal__dialog">
            <button type="button" className="modal__delete-btn">
              Delete
            </button>
          </span>
          <div className="modal__modal2">
            <div className="modal__status-update">
              I thought we agreed you would be travelling Next Month?
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <Fragment>
        {this.renderUserInfo()}
        {this.renderTravelInfo()}
        {this.renderRequestInfo()}
        {this.renderButtons()}
        {this.renderAddComment()}
        <CommentBox />
        {this.renderRequestAprroval()}
        {this.renderUserComments()}
      </Fragment>
    );
  }
}
RequestDetailsModal.propTypes = {
  fetchUserRequestDetails: PropTypes.func,
  requestId: PropTypes.string,
  requestData: PropTypes.object,
  user: PropTypes.object

};

RequestDetailsModal.defaultProps = {
  fetchUserRequestDetails: () => {},
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
export default connect(mapStateToProps, { fetchUserRequestDetails })(RequestDetailsModal);
