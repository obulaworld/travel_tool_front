import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import Script from 'react-load-script';
import moment from 'moment';
import { FormContext } from '../FormsAPI';
import PersonalDetailsFieldset from './FormFieldsets/PersonalDetails';
import TravelDetailsFieldset from './FormFieldsets/TravelDetails';
import SubmitArea from './FormFieldsets/SubmitArea';
import './NewRequestForm.scss';

class NewRequestForm extends PureComponent {
  constructor(props) {
    super(props);
    const { modalType, requestOnEdit } = this.props;
    const user = (modalType === 'edit request' && requestOnEdit.passportName) 
      ? requestOnEdit.passportName : localStorage.getItem('name');
    const gender = (modalType === 'edit request'  && requestOnEdit.gender) 
      ? requestOnEdit.gender : localStorage.getItem('gender');
    const department = (modalType === 'edit request'  && requestOnEdit.department) 
      ? requestOnEdit.department : localStorage.getItem('department');
    const role = (modalType === 'edit request'  && requestOnEdit.role) 
      ? requestOnEdit.role : localStorage.getItem('role');
    const manager = (modalType === 'edit request'  && requestOnEdit.manager) 
      ? requestOnEdit.manager : localStorage.getItem('manager');
    const firstTripStateValues = this.getDefaultTripStateValues(0);
    const editTripsStateValues =modalType === 'edit request' 
      ? this.getTrips(requestOnEdit) : {};
    const requestTrips = modalType === 'edit request' 
      ? this.setTrips(requestOnEdit) : [{}];
    this.defaultState = { 
      values: {
        name: !(/^null|undefined$/).test(user) ? user : '', // FIX: need to be refactor later
        gender: !(/^null|undefined$/).test(gender) ? gender: '',
        department: !(/^null|undefined$/).test(department) ? department: '',
        role: !(/^null|undefined$/).test(role) ? role :'',
        manager: !(/^null|undefined$/).test(manager) ? manager : '',
        ...firstTripStateValues, ...editTripsStateValues
      },
      trips: requestTrips, errors: {},hasBlankFields: true, checkBox: 'notClicked', selection: 'return',
      collapse: false, title: 'Hide Details', position: 'none', line: '1px solid #E4E4E4', parentIds: 1
    };
    this.state = { ...this.defaultState };
  }


  componentDidMount() {
    const { modalType } = this.props;
    if (modalType === 'edit request') {
      this.handleEditForm();
    }
  }

  componentWillUnmount() {
    const { fetchUserRequests } = this.props;
    fetchUserRequests();
    this.handleClearForm();
  }

  setTrips = (requestOnEdit) => {
    const { trips } = requestOnEdit;
    let allTrips = [];
    trips.map(trip => allTrips.push(trip));
    return allTrips;
  }
  getTrips = (requestOnEdit) => {
    const {trips} = requestOnEdit;
    const tripsStateValues = [];
    trips.map((trip, index) => {
      tripsStateValues[`origin-${index}`] = trip.origin;
      tripsStateValues[`destination-${index}`] = trip.destination;
      tripsStateValues[`arrivalDate-${index}`] = moment(trip.returnDate);
      tripsStateValues[`departureDate-${index}`] = moment(trip.departureDate);
    });
    return tripsStateValues;
  }
  handleEditForm = () => {
    const { requestOnEdit } = this.props;
    const event = {
      target: {
        value: requestOnEdit.tripType
      }
    };
    this.handleRadioButton(event);
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
    const { trips } = this.state;
    const options = {
      types: ['(cities)'],
    };
    const autocomplete = new google.maps.places.Autocomplete(event.target, options);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace().address_components;
      const countryIndex = place.findIndex(addr => addr.types.includes('country'));
      const places = place[0].long_name + ', ' + place[countryIndex].long_name;
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
    const { modalType, requestOnEdit } = this.props;
    const { collapse } = this.state;
    const tripType = event.target.value;
    this.setState({
      selection: tripType,
    }, this.validate);
    if (tripType === 'multi' && !collapse) {
      this.collapsible();
      let parentIds, trips, secondTripStateValues = {};
      if(modalType === 'edit request') {
        parentIds = requestOnEdit.trips.length;
        trips = requestOnEdit.trips;
      } else {
        parentIds = 2;
        trips = [].concat([{}, {}]);
        secondTripStateValues = this.getDefaultTripStateValues(1);
      }
      this.setState(prevState => ({
        parentIds,
        trips,
        values: { ...prevState.values, ...secondTripStateValues }
      }));
    }else if (!collapse) {
      this.setState(prevState => {
        const {newValues, trips} = this.refreshValues(prevState, tripType);
        return {
          parentIds : 1,
          values: newValues,
          trips: trips || [{}]
        };
      });
    }else{
      this.setState(prevState => {
        const {newValues, trips} = this.refreshValues(prevState, tripType);
        return {
          parentIds : 1,
          values: newValues,
          trips: trips || [{}]
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
    const {values, trips} = prevState;
    const newValues = {...this.defaultState.values};
    Object.keys(newValues)
      .map(inputName => (newValues[inputName] = values[inputName]));
    if(tripType === 'oneWay'){
      let newTrip = {...trips[0]};
      delete newValues['arrivalDate-0'];
      delete newTrip.returnDate;
      trips[0] = newTrip;
      const slicedTrips = trips.slice(0, 1);
      return {newValues, trips: slicedTrips };
    }
    if(tripType === 'return'){
      const slicedTrips = trips.slice(0, 1);
      return {newValues, trips: slicedTrips };
    }
    return {newValues, trips};
  }
 
  handleSubmit = event => {
    event.preventDefault();
    const { handleCreateRequest, handleEditRequest, modalType, requestOnEdit, updateUserProfile, user } = this.props;
    const { values, selection, trips } = this.state;
    const newData = {
      name: values.name,
      tripType: selection,
      manager: values.manager,
      gender: values.gender,
      trips,
      department: values.department,
      role: values.role
    };
    const checkBoxState = localStorage.getItem('checkBox');
    if (checkBoxState === 'clicked') {
      values.passportName = values.name;
      values.occupation = values.role;
      const userId = user.UserInfo.id;
      // this adds user profile to the database *do not remove
      updateUserProfile(values, userId);
      this.savePersonalDetails(values.passportName, values.gender, values.department, values.occupation, values.manager);
    }
    let data = { ...newData };

    if (this.validate() && modalType === 'edit request') {
      handleEditRequest(requestOnEdit.id, data);
    } else {
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
    localStorage.setItem('name', name);
    localStorage.setItem('gender', gender);
    localStorage.setItem('department', department);
    localStorage.setItem('role', role);
    localStorage.setItem('manager', manager);
  }
  
  renderPersonalDetailsFieldset = () => {
    const {collapse, title, position, line,values} = this.state;
    const { managers , occupations } = this.props; 
    return (
      <PersonalDetailsFieldset
        values={values}
        savePersonalDetails={this.savePersonalDetails}
        collapsible={this.collapsible}
        collapse={collapse}
        title={title}
        position={position}
        line={line}
        managers={managers}
        occupations={occupations}
        value="232px"
      />

    );
  }

  renderTravelDetailsFieldset = () => {
    const { selection, parentIds, values } = this.state;
    return (
      <TravelDetailsFieldset
        values={values}
        value="232px"
        selection={selection}
        handleDate={this.onChangeDate}
        handleRadioButtonChange={this.handleRadioButton}
        onChangeInput={this.onChangeInput}
        parentIds={parentIds}
        addNewTrip={this.addNewTrip}
        removeTrip={this.removeTrip}
      />
    );
  }

  renderForm = (managers, creatingRequest, occupations) => {
    const { values, errors, hasBlankFields, selection,  collapse, title, position, line, parentIds } = this.state;
    const { modalType } = this.props;
    return (
      <FormContext targetForm={this} errors={errors} validatorName="validate">
        {creatingRequest && (
          <h5 className="style-h5">
         Creating request...
          </h5>
        )}
        <form onSubmit={this.handleSubmit} className="new-request">
          {this.renderPersonalDetailsFieldset()}
          {this.renderTravelDetailsFieldset()}
          <Script
            url={process.env.REACT_APP_CITY}
            onCreate={this.handleScriptCreate}
            onError={this.handleScriptError}
            onLoad={this.handleScriptLoad} />
          <SubmitArea
            onCancel={this.handleClearForm}
            hasBlankFields={hasBlankFields}
            send={modalType === 'edit request' ? 'Update Request' : 'Send Request'}
          />
        </form>
      </FormContext>
    );
  }

  render() {
    const {managers,creatingRequest, occupations } = this.props;
    return (
      <div>
        {this.renderForm(managers,creatingRequest, occupations)}
      </div>
    );
  }
}

NewRequestForm.propTypes = {
  handleCreateRequest: PropTypes.func.isRequired,
  user:PropTypes.object.isRequired,
  updateUserProfile:PropTypes.func.isRequired,
  handleEditRequest: PropTypes.func.isRequired,
  managers: PropTypes.array,
  creatingRequest: PropTypes.bool,
  modalType: PropTypes.string,
  requestOnEdit: PropTypes.object.isRequired,
  fetchUserRequests: PropTypes.func.isRequired,
  occupations: PropTypes.array.isRequired,
};

NewRequestForm.defaultProps = {
  creatingRequest: false,
  modalType: null,
  managers: []
};

export default NewRequestForm;
