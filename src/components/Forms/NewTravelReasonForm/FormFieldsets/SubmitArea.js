import React from 'react';
import { PropTypes } from 'prop-types';
import ButtonLoadingIcon from '../../ButtonLoadingIcon';

const SubmitArea = ({ onCancel, hasBlankFields, travelReason }) => {
  const { isCreating } = travelReason;
  return (
    <fieldset>
      <div className="submit-area delete-checklist-item__right">
        <button
          type="button"
          className="bg-btn bg-btn--inactive"
          onClick={onCancel} id="cancel">
          Cancel
        </button>
        <button
          type="submit"
          className="bg-btn bg-btn--active"
          disabled={hasBlankFields || isCreating}
        >
          <ButtonLoadingIcon isLoading={isCreating} buttonText="Add Reason" />
        </button>
      </div>
    </fieldset>
  );
};

SubmitArea.propTypes = {
  onCancel: PropTypes.func.isRequired,
  hasBlankFields: PropTypes.bool.isRequired,
  travelReason: PropTypes.object
};

SubmitArea.defaultProps = {
  travelReason: {}
};

export default SubmitArea;
