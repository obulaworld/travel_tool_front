import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRenderer from '../../FormsAPI';
import error from '../../../../images/error.svg';
import * as MaintanceFormMetadata from '../../FormsMetadata/MaintanceFormMetadata';

class MaintainanceFieldSets extends Component {
  render() {
    this.inputRenderer = new InputRenderer(MaintanceFormMetadata);
    const { renderInput } = this.inputRenderer;
    const { hasBlankFields } = this.props;

    return (
      <fieldset className="maintainance-details">
        <div className="input-group">
          {renderInput('maintainanceStart', 'date')}
          {renderInput('maintainanceEnd', 'date')}
          {renderInput('reason', 'text')}
        </div>
        <span className="msg-maintainence">
          <img src={error} alt="error" className="img_error" />
          This room will be unavailable for booking by guests
        </span>
      </fieldset>
    );
  }
}
MaintainanceFieldSets.propTypes = {
  hasBlankFields: PropTypes.bool.isRequired,
};
MaintainanceFieldSets.defaultProps = {
};

export default MaintainanceFieldSets;
