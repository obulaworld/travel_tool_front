import React from 'react';
import {PropTypes} from 'prop-types';

const SubmitArea = (props) => {
  const { hasBlankFields, onCancel, send, cancel, modalType, onEditCancel } = props;

  return (
    <fieldset>
      <div className="submit-area">
        { modalType === 'edit accomodation' ? (
          <button type="button" className="bg-btn bg-btn--inactive" id="oncancel" onClick={onEditCancel}>
          Cancel
          </button>)
          : (
            <button type="button" className="bg-btn bg-btn--inactive" onClick={onCancel} id="cancel">
              {cancel ? cancel : 'Clear'}
            </button>
          )}
        <button type="submit" disabled={hasBlankFields} className="bg-btn bg-btn--active" id="submit">
          { send }
        </button>
      </div>
    </fieldset>
  );
};

SubmitArea.propTypes = {
  onCancel: PropTypes.func.isRequired,
  hasBlankFields: PropTypes.bool.isRequired,
  send: PropTypes.string.isRequired,
  cancel: PropTypes.string.isRequired,
  modalType: PropTypes.string.isRequired,
  onEditCancel: PropTypes.func.isRequired,
};

export default SubmitArea;
