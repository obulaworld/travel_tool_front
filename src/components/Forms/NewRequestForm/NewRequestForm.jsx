import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import Script from 'react-load-script';
import { FormContext } from '../FormsAPI';
import PersonalDetailsFieldset from './FormFieldsets/PersonalDetails';
import TravelDetailsFieldset from './FormFieldsets/TravelDetails';
import SubmitArea from './FormFieldsets/SubmitArea';
import './NewRequestForm.scss';

class NewRequestForm extends PureComponent {
  constructor(props) {
    super(props);
    const user = localStorage.getItem('passportName');
    const gender = localStorage.getItem('gender');
    const department = localStorage.getItem('department');
    const role = localStorage.getItem('role');
    const manager = localStorage.getItem('manager');

    const checkBoxState = localStorage.getItem('state');

    const firstTripStateValues = this.getDefaultTripStateValues(0);

    this.defaultState = {
      values: {
        name: !(/^null|undefined$/).test(user) ? user : '', // FIX: need to be refactor later
        gender: !(/^null|undefined$/).test(gender) ? gender: '',
        department: !(/^null|undefined$/).test(department) ? department: '',
        role: !(/^null|undefined$/).test(role) ? role :'',
        manager: !(/^null|undefined$/).test(manager) ? manager : '',
        ...firstTripStateValues
      },
      trips: [{}],
      errors: {},
      hasBlankFields: true,
      checkBox: 'notClicked',
      selection: 'return',
      collapse: false,
      title: 'Hide Details',
      position: 'none',
      line: '1px solid #E4E4E4',
      parentIds: 1
    };
    this.state = { ...this.defaultState };
  }

  componentWillUnmount() {
    this.handleClearForm();
  }
  onChangeDate = (date, event) => {
    const { trips, selection } = this.state;
    const dateFormat = date.format('YYYY-MM-DD');
    const dateWrapperId = event.nativeEvent.path[7].id;
    const dateName = dateWrapperId.split('_')[0];
    const getId = dateName.split('-')[1];
    const dateStartsWithDeparture = dateName.startsWith('departure');
    if (trips[getId]){
      if (dateStartsWithDeparture) {
        trips[getId].departureDate = dateFormat;
      } else if (dateName.startsWith('arrival')) {
        trips[getId].returnDate = dateFormat;
      }
    }else {
      trips.push({
        [dateName.split('-')[0]]: dateFormat
      });
    }

    const onPickDate = (dateStartsWithDeparture && selection !== 'oneWay')
      ? () => this.resetTripArrivalDate(getId)
      : () => this.validate(dateName);

    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [dateName]: date
      }
    }), onPickDate);
  }

  resetTripArrivalDate = (id) => {
    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        [`arrivalDate-${id}`]: null
      }
    }), this.validate);
  }

  onChangeInput = (event) => {
    const name = event.target.name;
    const getId = event.target.dataset.parentid;
    const { trips, values } = this.state;
    const options = {
      types: ['(cities)'],
    };
    const autocomplete = new google.maps.places.Autocomplete(event.target, options);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace().address_components;
      const places = place[0].long_name + ' ' + place[2].long_name;
      if (trips[getId]){
        if (name.startsWith('destination')) {
          trips[getId].destination = places;
        } else if (name.startsWith('origin')) {
          trips[getId].origin = places;
        }
      }else {
        trips.push({
          [name.split('-')[0]]: places
        });
      }
      this.setState(prevState => ({
        values: {
          ...prevState.values,
          [name] :  places
        }
      }), this.validate);
    });
  }
  handleRadioButton = (event) => {
    const { selection, collapse } = this.state;
    const tripType = event.target.value;
    this.setState({
      selection: tripType,
    }, this.validate);
    if (tripType === 'multi' && !collapse) {
      this.collapsible();
      const secondTripStateValues = this.getDefaultTripStateValues(1);
      this.setState(prevState => ({
        parentIds : 2,
        trips: [].concat([prevState.trips[0] || {}, {}]),
        values: { ...prevState.values, ...secondTripStateValues }
      }));
    }else if (!collapse) {
      this.setState(prevState => {
        const newValues = this.refreshValues(prevState, tripType);
        return {
          parentIds : 1,
          values: newValues,
          trips: [prevState.trips[0] || {}]
        };
      });
    }else{
      this.setState(prevState => {
        const newValues = this.refreshValues(prevState, tripType);
        return {
          parentIds : 1,
          values: newValues,
          trips: [prevState.trips[0] || {}]
        };
      });
      this.collapsible();
    }
  }
  getDefaultTripStateValues = (index) => ({
    [`origin-${index}`]: '',
    [`destination-${index}`]: '',
    [`arrivalDate-${index}`]: null,
    [`departureDate-${index}`]: null
  })
  refreshValues = (prevState, tripType) => {
    // squash state.values to the shape defaultState keeping the values from state
    const {values} = prevState;
    const newValues = {...this.defaultState.values};
    Object.keys(newValues)
      .map(inputName => (newValues[inputName] = values[inputName]));
    tripType === 'oneWay' && delete newValues['arrivalDate-0'];
    return newValues;
  }
  handleSubmit = event => {
    event.preventDefault();
    const { handleCreateRequest, updateUserProfile, user } = this.props;
    const { values, selection, trips } = this.state;
    const newData = {
      name: values.name,
      tripType: selection,
      manager: values.manager,
      gender: values.gender,
      trips: trips,
      department: values.department,
      role: values.role
    };
    const checkBoxState = localStorage.getItem('state');
    if (checkBoxState === 'clicked') {
      values.passportName = values.name;
      values.occupation = values.role;
      const userId = user.UserInfo.id;
      // this adds user profile to the database *do not remove
      updateUserProfile(values, userId);
      this.savePersonalDetails(values.passportName, values.gender, values.department, values.occupation, values.manager);
    }
    if (this.validate()) {
      let data = { ...newData };
      handleCreateRequest(data);
    }
  };
 
  addNewTrip = () => {
    return this.setState(prevState => {
      const { parentIds, values, trips } = prevState;
      const addedTripStateValues = this.getDefaultTripStateValues(parentIds);
      return {
        parentIds: parentIds + 1,
        trips: trips.concat([{}]),
        values: { ...values, ...addedTripStateValues }
      };
    }, this.validate);
  }
  removeTrip = (i) => {
    const tripProps = ['origin', 'destination', 'arrivalDate', 'departureDate'];
    this.setState((prevState) => {
      let { parentIds, trips, values, errors } = prevState;
      trips.splice(i, 1);
      parentIds--;
      tripProps.map(prop => {
        // shift trips state values up a level from deleted index
        let start = i;
        while (start < parentIds) {
          values[`${prop}-${start}`] = values[`${prop}-${start+1}`];
          start++;
        }
        // remove other redundant things from state
        delete values[`${prop}-${parentIds}`];
        delete errors[`${prop}-${i}`];
      });
      return { trips, values, parentIds, errors };
    }, this.validate);
  }
  handleClearForm = () => {
    this.setState({ ...this.defaultState });
  };
  hasBlankTrips = () => {
    let { trips } = this.state;
    const blank = trips.map(trip => {
      return Object.keys(trip).some(key => !trip[key]);
    });
    return blank;
  }
  validate = field => {
    let { values, errors, trips } = this.state;
    [errors, values, trips] = [{ ...errors }, { ...values }, [...trips]];
    let hasBlankFields = false;
    hasBlankFields = Object.keys(values).some(key => !values[key]);
    if (!field){
      this.setState({hasBlankFields});
      return !hasBlankFields;
    }

    !values[field]
      ? (errors[field] = 'This field is required')
      : (errors[field] = '');
    this.setState(prevState => ({ ...prevState, errors, hasBlankFields}));
    return !hasBlankFields;
  };
  collapsible =  () => {
    const { collapse } = this.state;
    if(!collapse) {
      this.setState({
        collapse: true,
        title: 'Show Details',
        position: 'rotate(266deg)',
        line: 'none'
      });
    }else{
      this.setState({
        collapse: false,
        title: 'Hide Details',
        position: 'none',
        line: '1px solid #E4E4E4'
      });
    }
  }

  savePersonalDetails(name, gender, department, role, manager) {
    // save to localstorage
    localStorage.setItem('passportName', name);
    localStorage.setItem('gender', gender);
    localStorage.setItem('department', department);
    localStorage.setItem('role', role);
    localStorage.setItem('manager', manager);
  }


  renderForm = (managers, creatingRequest) => {
    const { values, errors, hasBlankFields, selection,  collapse, title, position, line, parentIds } = this.state;
    return (
      <FormContext targetForm={this} errors={errors} validatorName="validate">
        {creatingRequest && (
          <h5 className="style-h5">
         Creating request...
          </h5>
        )}
        <form onSubmit={this.handleSubmit} className="new-request">
          <PersonalDetailsFieldset
            values={values}
            collapsible={this.collapsible}
            collapse={collapse}
            title={title}
            position={position}
            line={line}
            managers={managers}
            value="232px"
          />
          <TravelDetailsFieldset
            values={values}
            value="232px"
            selection={selection}
            handleDate={this.onChangeDate}
            handleChange={this.handleRadioButton}
            onChangeInput={this.onChangeInput}
            parentIds={parentIds}
            addNewTrip={this.addNewTrip}
            removeTrip={this.removeTrip}
          />
          <Script
            url={process.env.REACT_APP_CITY} />
          <SubmitArea
            onCancel={this.handleClearForm}
            hasBlankFields={hasBlankFields}
            send="Send Request"
          />
        </form>
      </FormContext>
    );
  }

  render() {
    const { managers, creatingRequest } = this.props;
    return (
      <div>
        {this.renderForm(managers, creatingRequest)}
      </div>
    );
  }
}

NewRequestForm.propTypes = {
  handleCreateRequest: PropTypes.func.isRequired,
  updateUserProfile:PropTypes.func.isRequired,
  managers: PropTypes.array,
  creatingRequest: PropTypes.bool,
  user:PropTypes.object.isRequired,
};

NewRequestForm.defaultProps = {
  creatingRequest: false,
  managers: []
};

export default NewRequestForm;
