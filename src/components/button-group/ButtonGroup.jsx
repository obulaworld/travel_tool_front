import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './buttonGroup.scss';

class ButtonGroup extends PureComponent {
  renderAllButton(){
    // this will render the
    // blue button with the all text
    return(
      <button type="button" className="bg-btn bg-btn--active">
      All
      </button>
    );
  }

  render() {
    const {buttonsType} = this.props;
    const [badgeClass, buttonText] = buttonsType === 'requests'?
      ['badge', 'Requests']: ['badge--approvals', 'Approvals'];

    return (
      <div className="button-group">
        {this.renderAllButton()}
        <button type="button" className="bg-btn bg-btn--with-badge">
          <span className="label">
            {`Pending ${buttonText}`}
          </span>
          <span className={badgeClass}>
            3
          </span>
        </button>
        <button type="button" className="bg-btn">
          {`Past ${buttonText}`}
        </button>
      </div>
    );
  }
}

ButtonGroup.propTypes = {
  buttonsType: PropTypes.string.isRequired
};

export default ButtonGroup;
