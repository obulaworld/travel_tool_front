import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Preloader from '../Preloader/Preloader';
import WithLoadingTravelStipendsCards from './TravelStipendsCards';
import NoTravelStipends from './NoTravelStipends';

class ListTravelStipends extends Component{

  componentDidMount() {
    const { fetchAllTravelStipends } = this.props;
    fetchAllTravelStipends();
  }
  render() {
    const {
      listAllTravelStipends: {stipends, isLoading}
    } = this.props;
    return (
      <div>
        {isLoading
          ? <Preloader />
          : (
            <Fragment>
              {stipends.length > 0 ? (
                <div>
                  <WithLoadingTravelStipendsCards
                    stipends={stipends}
                  />
                </div>
              ) :
                (<NoTravelStipends />)}
            </Fragment>
          )}
      </div>
    );
  }
}

ListTravelStipends.propTypes = {
  fetchAllTravelStipends: PropTypes.func.isRequired,
  listAllTravelStipends: PropTypes.object.isRequired,
};

export default ListTravelStipends;
