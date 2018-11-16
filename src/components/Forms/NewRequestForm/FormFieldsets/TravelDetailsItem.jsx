import React, { Component, Fragment } from 'react';
import Moment from 'moment';
import { PropTypes } from 'prop-types';
import location from '../../../../images/location.svg';
import deleteBtnRed from '../../../../images/delete.svg';

class TravelDetailsItem extends Component {
  state = {
    choices: [],
    bedOnEdit: null,
    gender: null,
    trip: null
  }

  componentDidMount() {
    const {itemId, modalType, requestOnEdit, values } = this.props;
    this.loadState(requestOnEdit, itemId, modalType, values);
  }

  componentWillReceiveProps(nextProps) {
    const { itemId, availableRooms, values, modalType } = nextProps;
    const rowId = availableRooms.rowId || 0;
    if (rowId === itemId) {
      this.setBedChoices(modalType, values, availableRooms.beds);
    }
  }

  validateTripRecord = (values, itemId) => {
    const { trip, gender } = this.state;
    const origin =  (trip.origin === values[`origin-${itemId}`]);
    const destination = (trip.destination === values[`destination-${itemId}`]);
    const departureDate = (Moment(values[`departureDate-${itemId}`]).isSame(trip.departureDate));
    const arrivalDate = (Moment(values[`arrivalDate-${itemId}`]).isSame(trip.returnDate));
    const genderCheck = values.gender === gender;
    return (origin && destination && departureDate && arrivalDate && genderCheck);
  }

  getRawBedChoices = (modalType, values, beds) => {
    const { bedOnEdit, itemId } = this.state;
    let bedChoices = [...beds];
    if (modalType === 'edit request' && bedOnEdit) {
      if (this.validateTripRecord(values, itemId)) {
        bedChoices = [bedOnEdit, ...beds];
      }
    }
    return bedChoices;
  }

  loadState = (request = [], itemId, modalType, values) => {
    const trip = (request.trips) && request.trips[itemId];
    const pendingState = { itemId };
    if (trip && modalType === 'edit request') {
      pendingState.bedOnEdit = trip.beds;
      pendingState.trip = {...trip};
      pendingState.gender = request.gender;
    }
    this.setState({ ...pendingState }, () => this.setBedChoices(modalType, values, []));
  }

  setBedChoices = (modalType, values, beds) => {
    let bedChoices = this.getRawBedChoices(modalType, values, beds);
    if (bedChoices.length < 1) {
      bedChoices = [{ label: 'No beds found', value: -1 }];
    } else {
      bedChoices = bedChoices.map(choice => ({
        label: `${choice.rooms.roomName}, ${choice.bedName}`,
        value: choice.id
      }));
    }
    this.setState({
      choices: bedChoices
    });
  }

  handleChangeInput = event => {
    const { onChangeInput, handlePickBed, selection } = this.props;
    const { itemId } = this.state;
    onChangeInput(event);
    if (selection !== 'oneWay') handlePickBed(null, itemId, false);
  }

  handleDate = (date, event) => {
    const { handleDate, handlePickBed, selection } = this.props;
    const { itemId } = this.state;
    handleDate(date, event);
    if (selection !== 'oneWay') handlePickBed(null, itemId, false);
  }

  renderLocation = (locationType) => {
    const {
      itemId,
      renderInput,
    } = this.props;
    return (
      <div className="travel-to" onChange={this.handleChangeInput}>
        {renderInput(`${locationType}-${itemId}`, 'text', { parentid: itemId })}
        <img src={location} alt="icn" className="location-icon" />
      </div>
    );
  }

  renderDeparture = () => {
    const {
      itemId,
      values,
      renderInput,
      customPropsForDeparture
    } = this.props;
    return (
      <div className="others-width" role="presentation">
        {renderInput(`departureDate-${itemId}`, 'date', {
          ...customPropsForDeparture(values),
          parentid: itemId,
          handleDate: this.handleDate,
          onChange: this.handleDate
        })}
      </div>
    );
  }

  renderArrival = () => {
    const {
      itemId,
      values,
      renderInput,
      customPropsForArrival,
    } = this.props;
    return(
      <div className="others-width" role="presentation">
        {renderInput(`arrivalDate-${itemId}`, 'date', {
          ...customPropsForArrival(
            values,
            `departureDate-${itemId}`
          ),
          parentid: itemId,
          handleDate: this.handleDate,
          onChange: this.handleDate
        })}
      </div>
    );
  }

  renderBedDropdown = () => {
    const {
      itemId,
      selection,
      values,
      handlePickBed,
      availableRooms,
      renderInput,
      fetchRoomsOnFocus
    } = this.props;

    const { choices } = this.state;
    return (
      <div className="travel-to">
        {(availableRooms.isLoading && availableRooms.rowId === itemId) ? (
          <div className="travel-input-area__spinner" />)
          : null}
        {renderInput(`bed-${itemId}`, 'dropdown-select', {
          parentid: itemId,
          size: '100%',
          choices: choices,
          onChange: value => handlePickBed(value, itemId),
          onFocus: () => fetchRoomsOnFocus(values, itemId, selection)
        })}
      </div>
    );
  }

  render() {
    const { itemId, selection, removeTrip } = this.props;
    return (
      <Fragment>
        <div className="travel-input-area">
          <div className="input-group" id={`trip${itemId}`}>
            <div className={`rectangle ${selection}`}>
              <div className="style-details">
                {this.renderLocation('origin')}
                {this.renderLocation('destination')}
                {this.renderDeparture()}
                {selection !== 'oneWay' ? this.renderArrival() : null}
                {selection !== 'oneWay' ? this.renderBedDropdown() : null}
              </div>
            </div>
            {selection === 'multi' &&
              itemId >= 2 && (
              <button
                type="button"
                className="delete-icon"
                onClick={() => removeTrip(itemId)}
              >
                <img src={deleteBtnRed} alt="clicked" className="addsvg" />
              </button>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default TravelDetailsItem;

const itemId = PropTypes.number;
const values = PropTypes.object;
const selection = PropTypes.string;
const onChangeInput = PropTypes.func;
const handleDate = PropTypes.func;
const removeTrip = PropTypes.func;
const handlePickBed = PropTypes.func;
const availableRooms = PropTypes.object;
const renderInput = PropTypes.func;
const customPropsForDeparture = PropTypes.func;
const customPropsForArrival = PropTypes.func;
const fetchRoomsOnFocus = PropTypes.func;
const modalType = PropTypes.string;
const requestOnEdit = PropTypes.object;

TravelDetailsItem.propTypes = {
  itemId: itemId.isRequired,
  values: values.isRequired,
  selection: selection.isRequired,
  onChangeInput: onChangeInput.isRequired,
  handleDate: handleDate.isRequired,
  removeTrip: removeTrip.isRequired,
  handlePickBed: handlePickBed.isRequired,
  availableRooms: availableRooms.isRequired,
  renderInput: renderInput.isRequired,
  customPropsForDeparture: customPropsForDeparture.isRequired,
  customPropsForArrival: customPropsForArrival.isRequired,
  fetchRoomsOnFocus: fetchRoomsOnFocus.isRequired,
  modalType: modalType.isRequired,
  requestOnEdit: requestOnEdit.isRequired
};

