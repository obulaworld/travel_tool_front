import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import ButtonLoadingIcon from '../../ButtonLoadingIcon';
import commentIcon from '../../../../images/icons/new-request-icons/Chat.svg';

class SubmitArea extends Component{
  constructor(props){
    super(props);
  }

    commentSession = () =>{
      return(
        <div>
          <img src={commentIcon} alt="" />
          <span className="request__new-comment">
              Add comment
          </span>
        </div>
      );
    }
    submitButton = (hasBlankFields, loading, isCreating, sameOriginDestination, disableOnChangeProfile, send, nextStep) =>{
      return(
        <button 
          type="submit"
          onClick={e =>{ nextStep ? nextStep(e) : null; }}
          disabled={hasBlankFields || loading || isCreating || (sameOriginDestination && disableOnChangeProfile)}
          className="bg-btn bg-btn--active"
          id="submit">
          <ButtonLoadingIcon isLoading={loading || isCreating} buttonText={send} />
        </button>
      );
    }

    renderCancelButton(modalType, onEditCancel, onCancel) {
      return (modalType === 'edit accomodation' ? (
        <button
          type="button"
          className="bg-btn bg-btn--inactive"
          id="oncancel" onClick={onEditCancel}>
          Cancel
        </button>)
        : (
          <button
            type="button"
            className="bg-btn bg-btn--inactive"
            onClick={onCancel} id="cancel">
              Cancel
          </button>
        ));
    }


    render(){
      const { hasBlankFields,sameOriginDestination, onCancel, send, modalType,
        onEditCancel, selection, loading, isCreating, disableOnChangeProfile, nextStep } = this.props;
      return(
        <fieldset className="submit__area-border">
          <div className={selection ? `submit-area submit-area--${selection}` : 'submit-area'}>
            {send==='Next' && this.commentSession() }
            { onCancel ? this.renderCancelButton(modalType, onEditCancel, onCancel) : (<div />)}
            { send === 'Next' ? (
              this.submitButton(hasBlankFields, loading, isCreating, sameOriginDestination, disableOnChangeProfile, send, nextStep)
            )
              : (
                this.submitButton(hasBlankFields, loading, isCreating, sameOriginDestination, disableOnChangeProfile, send)
                
              )
            }
          </div>
        </fieldset>

      );

    }

}

SubmitArea.propTypes = {
  onCancel: PropTypes.func,
  hasBlankFields: PropTypes.bool.isRequired,
  sameOriginDestination: PropTypes.bool,
  send: PropTypes.string.isRequired,
  modalType: PropTypes.string,
  onEditCancel: PropTypes.func,
  selection: PropTypes.string,
  loading: PropTypes.bool,
  isCreating: PropTypes.bool,
  disableOnChangeProfile: PropTypes.bool,
  nextStep: PropTypes.func,

};

SubmitArea.defaultProps = {
  modalType: '',
  selection: '',
  loading: false,
  isCreating: false,
  disableOnChangeProfile: false,
  sameOriginDestination: false,
  onEditCancel: () => {},
  nextStep: () => {},
  onCancel: null,
};

export default SubmitArea;
