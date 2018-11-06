import React from 'react';
import {PropTypes} from 'prop-types';

const SubmitArea = ({ onCancel, deleteChecklistItem }) => {

  return (
    <fieldset>
      <div className="submit-area">
        <button type="button" className="bg-btn bg-btn--inactive" onClick={onCancel} id="cancel">
          Cancel
        </button>
        <button type="button" className="restore-checklist-items__footer--delete" id="oncancel" onClick={deleteChecklistItem}>
            Delete
        </button>
      </div>
    </fieldset>
  );
};

SubmitArea.propTypes = {
  onCancel: PropTypes.func.isRequired,
  deleteChecklistItem: PropTypes.func.isRequired,
};

export default SubmitArea;
