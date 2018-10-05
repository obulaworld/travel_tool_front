import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import Script from 'react-load-script';
import axios from 'axios';
import AccommodationAPI from '../../../services/AccommodationAPI';
import { FormContext } from '../FormsAPI';
import { errorMessage } from '../../../helper/toast';
import SubmitArea from '../NewRequestForm/FormFieldsets/SubmitArea';
import AccommodationDetails from './FormFieldsets/AccommodationDetails';
import addPhoto from '../../../images/add_photo_alternate_24px.svg';


class NewAccommodation extends PureComponent {
  constructor(props) {
    super(props);
    const defaultRoom = this.defaultRoom(0);
    this.defaultState = {
      values: {
        houseName: '',
        location: '',
        bathRooms: '',
        image: '',
        preview: '',
        ...defaultRoom
      },
      rooms: [{}],
      errors: {},
      documentId: 1,
      hasBlankFields: true
    };
    this.state = { ...this.defaultState };
  }

  componentDidMount(){
    this.addRoomOnClick();
  }

  componentWillUnmount() {
    const { fetchAccommodation } = this.props;
    this.handleFormCancel();
    fetchAccommodation();
  }

  defaultRoom = (index) => ({
    [`roomName-${index}`]: '',
    [`roomType-${index}`]: '',
    [`bedCount-${index}`]: '',
  })

  handleImageChange = event => {
    event.preventDefault();
    const { values } = this.state;
    const reader = new FileReader();
    if (event.target.files[0]) {
      const file = event.target.files[0];
      reader.onloadend = () => {
        this.setState({
          values: {
            ...values,
            preview: reader.result,
            image: file,
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  displayImage = () => {
    const { values } = this.state;
    return values.preview ? (
      <img src={values.preview} alt="ImagePreview" className="imgPre" />
    ) : (
      <div className="image-rectangle">
        <img src={addPhoto} alt="ImagePreview" className="add-photo" />
      </div>
    );
  };

  handleLocation = event => {
    const { target } = event;
    const { values } = this.state;
    const options = {
      types: ['(cities)']
    };
    const autocomplete = new google.maps.places.Autocomplete(target, options);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace().address_components;
      const countryIndex = place.findIndex(addr =>
        addr.types.includes('country')
      );
      const places = place[0].long_name + ', ' + place[countryIndex].long_name;
      this.setState({
        values: {
          ...values,
          location: places
        }
      });
    });
  };

  handleInputChange = event => {
    const { rooms } = this.state;
    const { target } = event;
    const { name, value, dataset } = target;
    const { parentid } = dataset;
    const check = rooms[parentid];
    if (check) {
      if (name.startsWith('roomName')) {
        rooms[parentid].roomName = value;
      } else if (name.startsWith('bedCount')) {
        rooms[parentid].bedCount = value;
      }
    } else {
      rooms.push({ [name.split('-')[0]]: value });
    }
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [rooms]: value
      }
    }), this.validate);
  };

  handleDropDown = (data, choice) => {
    const { rooms } = this.state;
    const { name, parentid } = data;
    if (rooms[parentid]) {
      if (name.startsWith('roomType')) {
        rooms[parentid].roomType = choice;
      } else {
        rooms.push({ [name.split('-')[0]]: choice });
      }
      this.setState(
        prevState => ({
          values: {
            ...prevState.values,
            [rooms]: choice
          }
        }),
        this.validate
      );
    }
  };

  validate = field => {
    let { values, errors } = this.state;
    [errors, values] = [{ ...errors }, { ...values }];
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

  handleFormCancel = () => {
    this.setState({ ...this.defaultState });
  };

  addRoomOnClick = () => {
    return this.setState(prevState => {
      const { documentId, values, rooms } = prevState;
      const addNewRoom = this.defaultRoom(documentId);
      return {
        documentId: documentId + 1,
        values: { ...values, ...addNewRoom },
        rooms: rooms.concat([{}]),
      };
    }, this.validate);
  }

  removeRoom = i => {
    const roomsProps = ['roomName', 'roomType', 'bedCount'];
    this.setState((prevState) => {
      let { documentId, rooms, values, errors } = prevState;
      rooms.splice(i, 1);
      documentId--;
      roomsProps.map(prop => {
        let start = i;
        while (start < documentId) {
          values[`${prop}-${start}`] = values[`${prop}-${start+1}`];
          start++;
        }
        delete values[`${prop}-${documentId}`];
        delete errors[`${prop}-${i}`];
      });
      return { rooms, values, documentId, errors };
    }, this.validate);
  };


  handleInputSubmit = async event => {
    event.preventDefault();
    this.setState({ hasBlankFields: true });
    const { createAccommodation } = this.props;
    const { values, rooms } = this.state;
    const fd = new FormData();
    fd.append('file', values.image);
    fd.append('upload_preset', process.env.REACT_APP_PRESET_NAME);
    try {
      delete axios.defaults.headers.common['Authorization'];
      const imageData = await axios.post(process.env.REACT_APP_CLOUNDINARY_API, fd);
      const imageUrl = imageData.data.secure_url;
      AccommodationAPI.setToken();
      const guestHouse = {
        houseName: values.houseName,
        location: values.location,
        bathRooms: values.bathRooms,
        imageUrl: imageUrl,
        rooms: rooms
      };
      if (this.validate()) {
        createAccommodation(guestHouse);
      }
    } catch (error) {
      errorMessage('Unable to upload Image');
      this.setState({ hasBlankFields: false });
      AccommodationAPI.setToken();
    }
  };
 
  render() {
    const { values, errors, hasBlankFields, documentId } = this.state;
    return (
      <FormContext targetForm={this} errors={errors} validatorName="validate">
        <form onSubmit={this.handleInputSubmit} className="new-request">
          <AccommodationDetails
            values={values}
            handleDropDown={this.handleDropDown}
            handleImageChange={this.handleImageChange}
            displayImage={this.displayImage}
            addRoomOnClick={this.addRoomOnClick}
            documentId={documentId}
            removeRoom={this.removeRoom}
            handleInputChange={this.handleInputChange}
            handleLocation={this.handleLocation}
          />
          <Script url={process.env.REACT_APP_CITY} />
          <hr />
          <SubmitArea
            onCancel={this.handleFormCancel}
            hasBlankFields={hasBlankFields}
            send="Save"
          />
        </form>
      </FormContext>
    );
  }
}

NewAccommodation.propTypes = {
  createAccommodation: PropTypes.func.isRequired,
  fetchAccommodation: PropTypes.func.isRequired,
};

export default NewAccommodation;
