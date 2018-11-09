import React from 'react';
import PropTypes from 'prop-types';

const SubmitArea = ({ onCancel, hasBlankFields }) => (
  <fieldset>
    <div className="submit-area">
      <button type="button" className="bg-btn bg-btn--inactive" id="cancel" onClick={onCancel}>
        Cancel
      </button>
      <button type="submit" className="bg-btn bg-btn--active" id="submit" disabled={hasBlankFields}>
        Add
      </button>
    </div>
  </fieldset>
);

SubmitArea.propTypes = {
  onCancel: PropTypes.func.isRequired,
  hasBlankFields: PropTypes.bool.isRequired
};

export default SubmitArea;
