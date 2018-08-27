import React, { Component, Fragment } from 'react';
import Oval from '../../images/Oval.png';
import Oval2 from '../../images/Oval2.png';
import CommentBox from './CommentBox/CommentBox';
import ImageLink from '../image-link/ImageLink';
import TravelLink from './_RequestTravel';
import './RequestsModal.scss';

class RequestDetailsModal extends Component {
  state = {
    approveColor: '',
    rejectColor: '',
    approveTextColor: '',
    rejectTextColor: ''
  };

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
  
  renderUserInfo() {
    return (
      <div>
        <div className="modal__user-info">
          <ImageLink
            imageSrc={Oval}
            altText="avatar"
            imageClass="modal__oval"
          />
          <span className="modal__text-size">
          Silm Momoh
          </span>
          <div className="modal__modal3">
          Product Designer, Apprenticeship
          </div>
        </div>
      </div>
    );
  }

  renderTravelInfo() {
    return (
      <div className="modal__travel-place">
        <span className="modal__dialog1">
          Request to travel to:
          <span className="modal__city-name">
          Nairobi
          </span>
        </span>
        <span className="modal__dialog-from">
          From:
          <span className="modal__city-name">
          Lagos
          </span>
        </span>
      </div>
    );
  }

  renderRequestInfo() {
    return (
      <div className="modal__modal-date">
        <TravelLink 
          divClass="modal__travel-date" innerClass="modal__travel-dates" 
          dynamicText="Date submitted" nextClass="modal__date-text" dynamicDate="02 Aug 2018" />
        <TravelLink 
          divClass="modal__travel-date" innerClass="modal__travel-dates" 
          dynamicText="Date submitted" nextClass="modal__date-text" dynamicDate="02 Aug 2018" />

        <TravelLink 
          divClass="modal__travel-date" innerClass="modal__travel-dates" 
          dynamicText="Date submitted" nextClass="modal__date-text" dynamicDate="02 Aug 2018" />
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
    return (
      <div className="modal__modal1">
        <span className="modal__mdl-icons">
          <ImageLink
            imageSrc={Oval2}
            altText="avatar"
            imageClass="modal__oval-copy" />
          <span className="modal__user-name">
          Jolomi Otumara
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

export default RequestDetailsModal;
