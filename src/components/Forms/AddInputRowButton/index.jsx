import React from 'react';
import PropTypes from 'prop-types';
import addButtonIcon from '../../../images/add.svg';

const AddInputRowButton = ({ text, addRowHandler, wrapperClassName, buttonClassName }) => (
  <div className={wrapperClassName} role="button" tabIndex="0">
    <button type="button" className={buttonClassName} onClick={addRowHandler}>
      <img src={addButtonIcon} alt="clicked" className="addsvg" />
      {text}
    </button>
  </div>
);

AddInputRowButton.propTypes = {
  text: PropTypes.string.isRequired,
  addRowHandler: PropTypes.func.isRequired,
  wrapperClassName: PropTypes.string.isRequired,
  buttonClassName: PropTypes.string.isRequired,
};

export default AddInputRowButton;
