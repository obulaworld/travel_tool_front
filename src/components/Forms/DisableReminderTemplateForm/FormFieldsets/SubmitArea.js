import React from 'react';
import {PropTypes} from 'prop-types';

const SubmitArea = ({
  onCancel, disableEmailReminder,
  disableReminderTemplate, disableReason,
  templateReason, conditionReason, mode }) => {
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
                onClick={disableReminderTemplate? disableReminderTemplate : disableEmailReminder}
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
  conditionReason: PropTypes.string,
  templateReason: PropTypes.string,
  mode: PropTypes.string,
};
SubmitArea.defaultProps = {
  disableReason: null,
  conditionReason:'',
  templateReason: '',
  mode: ''
};

export default SubmitArea;
