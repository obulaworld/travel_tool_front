import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewRequestFormMetadata';
import expand from '../../../../images/expand_more_24px.svg';
import Checkbox from '../../../CheckBox/index';

class PersonalDetailsFieldset extends Component {
  state = {
    disableInputs:
      localStorage.getItem('checkBox') === 'clicked'
        ? 'disable-details' : ''
  };

  handleDisableInputs = value => {
    const { disableInputs } = this.state;
    const newState = value === 'clicked' ? 'disable-details' : '';
    /** Do not update state if the new value is equal to value already in state */
    if(newState !== disableInputs) {
      this.setState({
        disableInputs: newState
      });
    }
  };

  renderfields = collapse => {
    const { disableInputs } = this.state;
    const { value, managers,centers, onChangeManager } = this.props;
    const managerChoices = managers.map(manager => manager.fullName);
    const centerChoices = centers.map(center => center.location.split(',')[0]);
    const { renderInput } = this.inputRenderer;
    const disabled = disableInputs;
    return (
      <div>
        {!collapse ? (
          <div>
            <div className={`input-group ${disabled}`}>
              <div className="spaces">
                {renderInput('name', 'text', { 
                  className: 'request_dropdown', disabled: true })}
              </div>
              <div className="spaces">
                {renderInput('gender', 'button-toggler')}
              </div>
              {renderInput('department', 'text', { disabled: true, size: value,
                className: 'request_dropdown'})}
            </div>
            <div className={`input-group ${disabled}`}>
              <div className="spaces">
                {renderInput('role', 'text', {
                  disabled: true,
                  size: value,
                  className: 'request_dropdown',
                  id: 'your-role'
                })}
              </div>
              <div className="spaces">
                {renderInput('manager', 'filter-dropdown-select', {
                  choices: managerChoices,
                  size: value,
                  className: 'request_dropdown your-manager',
                  id: 'your-manager',
                  onChange: onChangeManager
                })}
              </div>
              <div className="spaces">
                {
                  renderInput('location', 'dropdown-select', {
                    choices: centerChoices,
                    size: value,
                    className: 'request_dropdown user-location',
                    id: 'user-location'
                  })
                }
              </div>
            </div>
            <div className="input-group">
              <Checkbox
                handleDisableInputs={this.handleDisableInputs}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  render() {
    const { collapsible, collapse, title, position, line, values } = this.props;
    this.inputRenderer = new InputRenderer(formMetadata);

    const disabledFields =
      values.state === 'clicked' ? 'disable-details' : null;
    return (
      <fieldset className={`personal-details ${disabledFields}`}>
        <legend
          style={{
            width: '100%',
            borderBottom: line,
            fontFamily: 'DIN Pro Medium',
            fontSize: '18px',
            paddingTop: '12px'
          }}>
          Personal Details
          <span className="required-field">* Required Field</span>
          <span
            className="hide-details"
            onClick={collapsible}
            onKeyPress={this.handleKeyDown}
            role="button"
            tabIndex={0}
            style={{ outline: 'none' }}>
            <img src={expand} alt="clicked" className="expand" style={{ transform: position }} />
            {!title ? 'Hide Details' : title}
          </span>
        </legend>
        {this.renderfields(collapse)}
      </fieldset>
    );
  }
}

const managers = PropTypes.array;
const collapsible = PropTypes.func;
const collapse = PropTypes.bool;
const title = PropTypes.string;
const position = PropTypes.string;
const values = PropTypes.object;
const onChangeManager = PropTypes.func;

PersonalDetailsFieldset.propTypes = {
  managers: managers.isRequired,
  collapsible: collapsible.isRequired,
  collapse: collapse.isRequired,
  title: title.isRequired,
  position: position.isRequired,
  line: position.isRequired,
  onChangeManager: onChangeManager.isRequired,
  values: values,
  centers: PropTypes.array,
  value: PropTypes.string,

};

PersonalDetailsFieldset.defaultProps = {
  values: {},
  value: '',
  centers: []
};

export default PersonalDetailsFieldset;
