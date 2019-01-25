import React from 'react';
import {PropTypes} from 'prop-types';

const SubmitArea = ({ onCancel, disableEmailReminder, disableReason, conditionReason }) => {

  return (
    <fieldset>
      <div className="submit-area">
        <button type="button" className="bg-btn bg-btn--inactive" onClick={onCancel} id="cancel">
          Cancel
        </button>
        {
          !conditionReason ?
            (
              <button
                type="button"
                className="restore-checklist-items__footer--delete"
                id="oncancel" onClick={disableEmailReminder}
                disabled={!disableReason}
              >
              Disable
              </button>
            )
            : ''
        }
      </div>
    </fieldset>
  );
};

SubmitArea.propTypes = {
  onCancel: PropTypes.func.isRequired,
  disableEmailReminder: PropTypes.func.isRequired,
  disableReason: PropTypes.string,
  conditionReason: PropTypes.string,
};
SubmitArea.defaultProps = {
  disableReason: null,
  conditionReason:''
};

export default SubmitArea;
