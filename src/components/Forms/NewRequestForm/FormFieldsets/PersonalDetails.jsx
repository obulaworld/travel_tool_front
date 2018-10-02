import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewRequestFormMetadata';
import expand from '../../../../images/expand_more_24px.svg';
import Checkbox from '../../../CheckBox/index';

class PersonalDetailsFieldset extends Component {
  state = {
    disableInputs:''
  }
  handleDisableInputs = (value) => {
    const { disableInputs } = this.state;
    const newState = value==='clicked'?'disable-details':'';
    this.setState({
      disableInputs: newState
    });
  };
  renderfields = (collapse) => {
    const { disableInputs } = this.state;
    const { values, savePersonalDetails } = this.props;
    const { renderInput } = this.inputRenderer;
    const disabled = disableInputs;
    return (
      <div>
        { !collapse ?
          ( 
            <div>
              <div className={`input-group ${disabled}`}>
                <div className="spaces">
                  {renderInput('name', 'text')}
                </div>
                <div className="spaces">
                  {renderInput('gender', 'button-toggler')}
                </div>
                {renderInput('department', 'dropdown-select')}
              </div>
              <div className={`input-group ${disabled}`}>
                <div className="spaces">
                  {renderInput('role', 'dropdown-select')}
                </div>
                {renderInput('manager', 'dropdown-select')}
              </div>
              <div className="input-group">
                <Checkbox savePersonalDetails={savePersonalDetails} values={values} handleDisableInputs={this.handleDisableInputs} />
              </div>
            </div>
          )  : null
        }
      </div>
    );
  }

 
  render() {
    const { managers, collapsible, collapse, title, position, line, values } = this.props;
    const managerNames = managers.map(manager => manager.fullName);
    formMetadata.dropdownSelectOptions.manager = managerNames;
    this.inputRenderer = new InputRenderer(this.props, formMetadata);
    const { renderInput } = this.inputRenderer;

    const disabledFields= values.state==='clicked'?'disable-details':null;
    return (
      <fieldset className={`personal-details ${disabledFields}`}>
        <legend style={{ width: '100%' , borderBottom: line }}>
          Personal Details
          <span className="required-field">
          * Required Field
          </span>
          <span
            className="hide-details" 
            onClick={collapsible} 
            onKeyPress={this.handleKeyDown} 
            role="button" 
            tabIndex={0}
            style={{outline: 'none'}}
          >
            <img src={expand} alt="clicked" className="expand" style={{transform: position }} />
            { !title ? 'Hide Details' : title }
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
const line = PropTypes.string;
const values = PropTypes.object;

PersonalDetailsFieldset.propTypes = {
  managers: managers.isRequired,
  collapsible: collapsible.isRequired,
  collapse: collapse.isRequired,
  title:  title.isRequired,
  position: position.isRequired,
  line: position.isRequired,
  values: values,
  savePersonalDetails: PropTypes.func.isRequired,
};

PersonalDetailsFieldset.defaultProps = {
  values: {},
};


export default PersonalDetailsFieldset;
