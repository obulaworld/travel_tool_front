import React from 'react';
import {PropTypes} from 'prop-types';

const SubmitArea = ({ onCancel, enableEmailReminderTemplate }) => {

  return (
    <fieldset>
      <div className="submit-area delete-checklist-item__right">
        <button type="button" className="bg-btn bg-btn--inactive" onClick={onCancel} id="cancel">
          Cancel
        </button>
        <button 
          type="button"
          className="bg-btn bg-btn--active"
          id="oncancel" onClick={enableEmailReminderTemplate}
        >
          Enable
        </button>
      </div>
    </fieldset>
  );
};

SubmitArea.propTypes = {
  onCancel: PropTypes.func.isRequired,
  enableEmailReminderTemplate: PropTypes.func.isRequired,
};

export default SubmitArea;
