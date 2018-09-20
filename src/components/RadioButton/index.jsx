import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './RaidoButton.scss';

class RadioButton extends PureComponent {

  render() {
    const  { name, value, id, defaultChecked} = this.props;
    return (
      <ul style={{ padding: '0' }}>
        <li>
          <input
            type="radio"
            id={id}
            value={value}
            name="selector"
            defaultChecked={defaultChecked}
            onChange={()=>{}}
          />
          <label htmlFor={id}>
            {name}
          </label>
          <div className="check" />
        </li>
      </ul>
    );
  }
}

RadioButton.propTypes = {
  name: PropTypes.string,
  value:  PropTypes.string,
  id:  PropTypes.string,
  defaultChecked: PropTypes.string,
};

RadioButton.defaultProps = {
  name: '',
  value:  '',
  id: '',
  defaultChecked: '',
};


export default RadioButton;
