import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes  from 'prop-types';
import WithLoadingCentreGrid from '../../components/CentreGrid';
import {
  fetchAccommodation
} from '../../redux/actionCreator/accommodationActions';


export class Accommodation extends PureComponent {
  componentDidMount() {
    const { fetchAccommodation } = this.props;
    fetchAccommodation();
  }

  render() {
    const { guestHouses, isLoading, accommodationError } = this.props;
    return(
      <div className="table__container">
        <WithLoadingCentreGrid
          guestHouses={guestHouses}
          isLoading={isLoading}
          error={accommodationError}
        />
      </div>
    );
  }
}

const actionCreators = {
  fetchAccommodation
};

export const mapStateToProps = (state) => ({
  ...state.accommodation
});

Accommodation.propTypes = {
  guestHouses:  PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    houseName: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    rooms: PropTypes.arrayOf(PropTypes.object).isRequired,
    bathRooms: PropTypes.number.isRequired
  })),
  isLoading: PropTypes.bool,
  accommodationError: PropTypes.string,
  fetchAccommodation: PropTypes.func.isRequired
};

Accommodation.defaultProps = {
  guestHouses: [],
  accommodationError: '',
  isLoading: false
};

export default connect(mapStateToProps, actionCreators)(Accommodation);
