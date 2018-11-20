import React,{Component} from 'react';
import {PropTypes} from 'prop-types';
import DropdownOptions from './DropdownOptions';

export default class filterDropdownSelect extends Component  {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    choices: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string.isRequired,
    size:  PropTypes.string.isRequired,
  };

  // default props
  static defaultProps = {
    choices: [],
  };

  state = {
    dropdownOpen: false,
    dropdownClass: ''
  };

  componentWillReceiveProps(nextProps, state){
    const { value } = this.props;
    const mutateState = (value) => {
      this.setState(state => {
        return {
          ...state,
          role: value
        };
      });
    };
    if (value !== nextProps.value) {
      mutateState(nextProps.value);
    }
    else {
      mutateState(value);
    }
  }

  // presents the matching options on the dropdown and their onClick events
  //and limits them to five options
  getSelectOptions(choices) {
    let filteredChoices = [null, null];
    const {role} = this.state;
    if (role){
      filteredChoices = choices.filter((eachChoice => eachChoice.toLowerCase().includes(role.toLowerCase())));
      let choiceLength = filteredChoices.length;
      if ( choiceLength > 5 ){
        filteredChoices.splice(5, choiceLength - 5);
      }

      return(
        <DropdownOptions
          items={filteredChoices}
          handleClick={this.handleClickOnOption}
          getDropdownStatus={this.getDropdownStatus}
        />
      );
    }
  }

  //function called after one dropdown option is clicked
  handleClickOnOption = (choice) => {
    const { onChange } = this.props;
    onChange(choice);
    this.handleToggleDropdown();
  }

  // method that changes the state of the dropdown from active(open) to inactive and viceversa
  handleToggleDropdown = (e) => {
    const {dropdownOpen} = this.state;
    this.setState(() => ({
      dropdownOpen: !dropdownOpen,
      dropdownClass: 'novisibility',
    }));
  }

   // get status of the dropdown: active/inactive
   getDropdownStatus = () => {
     const {dropdownOpen} = this.state;
     const dropdownStatus = dropdownOpen? 'active': 'inactive';
     return dropdownStatus;
   }

   changeText = (e) => {
     const {choices} = this.props;
     this.setState({[e.target.name]: e.target.value});
     this.getSelectOptions(choices);
     this.setState(() => ({dropdownClass: 'select-dropdown'}));
   }

   render(){
     const {choices, size} = this.props;
     const {role, dropdownClass} = this.state;
     const options = this.getSelectOptions(choices);
     return (
       <div style={{position:'relative'}}>
         <div className="value" style={{width: size}}>
           <input
             className="occupationInput"
             autoComplete="off"
             name="role"
             type="text"
             value={role}
             onChange={this.changeText}
           />
           {role ? (
             <div className={dropdownClass || 'hide'}>
               { options }
             </div>
           ): null}
         </div>
       </div>
     );
   }
}


