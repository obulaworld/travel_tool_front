import React from 'react';
import {PropTypes} from 'prop-types';

const SubmitArea = (props) => {
  const { hasBlankFields, onCancel, send } = props;

  return (
    <fieldset>
      <div className="submit-area">
        <button type="button" className="bg-btn bg-btn--inactive" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" disabled={hasBlankFields} className="bg-btn bg-btn--active">
          { send }
        </button>
      </div>
    </fieldset>
  );
};

SubmitArea.propTypes = {
  onCancel: PropTypes.func.isRequired,
  hasBlankFields: PropTypes.bool.isRequired,
  send: PropTypes.string.isRequired
};

export default SubmitArea;
