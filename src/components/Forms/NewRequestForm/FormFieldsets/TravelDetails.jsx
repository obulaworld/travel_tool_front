import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewRequestFormMetadata';
import RadioButton from '../../../RadioButton';
import location from '../../../../images/location.svg';
import addMultipleCityBtn from '../../../../images/add.svg';
import deleteBtnRed from '../../../../images/delete.svg';

class TravelDetailsFieldset extends Component {
  componentDidMount = () => {
    this.get_details();
  };

  get_details = () => {
    const { parentIds } = this.props;
    for (let i = 0; i < parentIds; i += 1) {
      const id = document.getElementById(i);
    }
  };

  customPropsForArrival = (values, name) => ({
    className: 'arrival-date',
    disabled: !values[name],
    minDate: moment(values[name]),
    placeholderText: !values[name]
      ? 'select depart date first'
      : 'select return date'
  });

  customPropsForDeparture = values => ({
    minDate: moment()
  });

  renderRadioButton = handleRadioButtonChange => {
    const { selection } = this.props;
    return (
      <div className="trip-align" onChange={handleRadioButtonChange}>
        <RadioButton
          name="One Way Trip"
          value="oneWay"
          id="oneWay"
          defaultChecked={selection === 'oneWay'}
        />
        <RadioButton
          name="Return Trip"
          value="return"
          id="return"
          defaultChecked={selection === 'return'}
        />
        <RadioButton
          name="Multi City Trip"
          value="multi"
          id="multi"
          defaultChecked={selection === 'multi'}
        />
      </div>
    );
  };

  renderAddAnotherBtn = () => {
    const { addNewTrip } = this.props;
    return (
      <div className="add-multi-trip-area">
        <button type="button" className="another-trip" onClick={addNewTrip}>
          <img src={addMultipleCityBtn} alt="clicked" className="addsvg" />
          Add another trip
        </button>
      </div>
    );
  };

  fetchRoomsOnFocus = (values, i, selection) => {
    let data = {};
    const { fetchAvailableRooms } = this.props;
    if (this.validateAllTripDetails(values, i, selection)) {
      data = {
        gender: values.gender,
        location: values[`destination-${i}`],
        arrivalDate: values[`arrivalDate-${i}`]
          ? values[`arrivalDate-${i}`].format('YYYY-MM-DD')
          : '',
        departureDate: values[`departureDate-${i}`].format('YYYY-MM-DD'),
        tripType: selection
      };
      fetchAvailableRooms(data);
    }
  }

  validateAllTripDetails(values, i, selection) {
    const isValid =
      values.gender &&
      values[`destination-${i}`] &&
      values[`departureDate-${i}`];
    if (selection === 'oneWay') return isValid;
    return isValid && values[`arrivalDate-${i}`];
  }


  renderTravelDetails = (i, selection, onChangeInput, mappedTrip) => {
    const {
      values,
      handleDate,
      handlePickBed,
      removeTrip,
      parentIds,
      existingTrips,
      availableRooms
    } = this.props;

    const { renderInput } = this.inputRenderer;
    
    let bedChoices = availableRooms.beds || ['Fetching beds...'];
    if (availableRooms.beds.length < 1) {
      bedChoices = [{ label: 'No beds found', value: [null] }];
    } else {
      bedChoices = bedChoices.map(choice => ({
        label: `${choice.rooms.roomName}, ${choice.bedName}`,
        value: choice.id
      }));
    }

    return (
      <Fragment>
        <div className="travel-input-area">
          <div className="input-group" id={`trip${i}`}>
            <div className={`rectangle ${selection}`}>
              <div className="style-details">
                <div className="travel-to" onChange={onChangeInput}>
                  {renderInput(`origin-${i}`, 'text', { parentid: i })}
                  <img src={location} alt="icn" className="location-icon" />
                </div>

                <div className="travel-to" onChange={onChangeInput}>
                  {renderInput(`destination-${i}`, 'text', { parentid: i })}
                  <img src={location} alt="icn" className="location-icon" />
                </div>

                <div className="others-width" role="presentation">
                  {renderInput(`departureDate-${i}`, 'date', {
                    ...this.customPropsForDeparture(values),
                    parentid: i,
                    handleDate,
                    onChange: handleDate
                  })}
                </div>
                {selection !== 'oneWay' ? (
                  <div className="others-width" role="presentation">
                    {renderInput(`arrivalDate-${i}`, 'date', {
                      ...this.customPropsForArrival(
                        values,
                        `departureDate-${i}`
                      ),
                      parentid: i,
                      handleDate,
                      onChange: handleDate
                    })}
                  </div>
                ) : null}
                <div className="travel-to">
                  {renderInput(`bed-${i}`, 'dropdown-select', {
                    parentid: i,
                    size: '100%',
                    choices: bedChoices,
                    onChange: value => handlePickBed(value, i),
                    onFocus: () => this.fetchRoomsOnFocus(values, i, selection)
                  })}
                </div>
              </div>
            </div>
            {selection === 'multi' &&
              i >= 2 && (
              <button
                type="button"
                className="delete-icon"
                onClick={() => removeTrip(i)}
              >
                <img src={deleteBtnRed} alt="clicked" className="addsvg" />
              </button>
            )}
          </div>
        </div>
      </Fragment>
    );
  };

  renderForms(parentIds, selection, onChangeInput) {
    const forms = [];
    for (let i = 0; i < parentIds; i += 1) {
      forms.push(
        <div id={i} key={i}>
          {this.renderTravelDetails(i, selection, onChangeInput)}
        </div>
      );
    }
    return forms;
  }

  render() {
    this.inputRenderer = new InputRenderer(formMetadata);
    const { handleRadioButtonChange, selection, onChangeInput } = this.props;

    const { parentIds, existingTrips } = this.props;
    return (
      <fieldset className="travel-details">
        <legend
          className="line"
          style={{ marginBottom: '6px', borderBottom:  '1px solid #E4E4E4',
            fontFamily: 'DIN Pro Medium',	fontSize: '18px', paddingTop: '5px' }}>
        Travel Details
        </legend>
        {this.renderRadioButton(handleRadioButtonChange)}
        {this.renderForms(parentIds, selection, onChangeInput, existingTrips)}
        {selection === 'multi' && this.renderAddAnotherBtn()}
      </fieldset>
    );
  }
}

const values = PropTypes.object;
const handleRadioButtonChange = PropTypes.func;
const selection = PropTypes.string;
const onChangeInput = PropTypes.func;
const addNewTrip = PropTypes.func;
const handleDate = PropTypes.func;
const removeTrip = PropTypes.func;
const parentIds = PropTypes.number;
const existingTrips = PropTypes.func;
const handlePickBed = PropTypes.func;
const fetchAvailableRooms = PropTypes.func;
const availableRooms = PropTypes.object;

TravelDetailsFieldset.propTypes = {
  values: values.isRequired,
  handleRadioButtonChange: handleRadioButtonChange.isRequired,
  selection: selection.isRequired,
  onChangeInput: onChangeInput.isRequired,
  addNewTrip: addNewTrip.isRequired,
  handleDate: handleDate.isRequired,
  removeTrip: removeTrip.isRequired,
  parentIds: parentIds.isRequired,
  existingTrips: existingTrips,
  handlePickBed: handlePickBed.isRequired,
  fetchAvailableRooms: fetchAvailableRooms.isRequired,
  availableRooms: availableRooms.isRequired
};

TravelDetailsFieldset.defaultProps = {
  existingTrips: null
};

export default TravelDetailsFieldset;
