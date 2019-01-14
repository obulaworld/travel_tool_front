import React from 'react';
import {PropTypes} from 'prop-types';
import ButtonLoadingIcon from '../../ButtonLoadingIcon';

const SubmitArea = (props) => {
  const { hasBlankFields,onCancel, send, selection, loading} = props;
  return (
    <fieldset>
      <div
        className={selection ? `submit-area submit-area--${selection}` : 'submit-area'}>
        <button
          type="button"
          className="bg-btn bg-btn--inactive"
          onClick={onCancel}
          id="cancel">
              Cancel
        </button>
        <button
          type="submit" disabled={hasBlankFields || loading}
          className="bg-btn bg-btn--active" id="submit">
          <ButtonLoadingIcon isLoading={loading} buttonText={send} />
        </button>
      </div>
    </fieldset>
  );
};

SubmitArea.propTypes = {
  onCancel: PropTypes.func.isRequired,
  hasBlankFields: PropTypes.bool.isRequired,
  send: PropTypes.string.isRequired,
  selection: PropTypes.string,
  loading: PropTypes.bool,
};

SubmitArea.defaultProps = {
  selection: '',
  loading: false,
};

export default SubmitArea;
