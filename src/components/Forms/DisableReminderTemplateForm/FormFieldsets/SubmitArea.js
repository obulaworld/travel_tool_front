import React from 'react';
import {PropTypes} from 'prop-types';

const SubmitArea = ({
  onCancel, disableEmailReminder,
  modalType,
  disableReminderTemplate, disableReason, mode }) => {
  return (
    <fieldset>
      <div className="submit-area">
        <button type="button" className="bg-btn bg-btn--inactive" onClick={onCancel} id="cancel">
          Cancel
        </button>
        {
          mode === 'add' ?
            (
              <button
                type="button"
                className="restore-checklist-items__footer--delete"
                id="oncancel"
                onClick={
                  modalType === 'disable reminder template' 
                    ? disableReminderTemplate 
                    : disableEmailReminder}
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
  disableReminderTemplate: PropTypes.func.isRequired,
  disableReason: PropTypes.string,
  mode: PropTypes.string,
  modalType: PropTypes.string,
};
SubmitArea.defaultProps = {
  disableReason: null,
  mode: '',
  modalType: '',
};

export default SubmitArea;
