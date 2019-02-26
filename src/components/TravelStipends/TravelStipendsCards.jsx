import React from 'react';
import './TravelStipends.scss';
import PropTypes from 'prop-types';
import withLoading from '../Hoc/withLoading';
import RequestPlaceholder from '../Placeholders/RequestsPlaceholder';
import ContextMenu from '../ContextMenu/ContextMenu';
import MenuItem from '../ContextMenu/MenuItem';

const handleDelete = (id, openModal, fetchSingleTravelStipend) => {
  openModal(true, 'Delete Stipend');
  fetchSingleTravelStipend(id);
};

export const TravelStipendsCard = ({location, stipend,openModal, id, fetchSingleTravelStipend}) => {
  return  (
    <div className="card">
      <div className="travel_stipend_menu">
        <ContextMenu classNames="table__menu-container">
          <MenuItem
            classNames="delete"
            onClick={() => handleDelete(id, openModal, fetchSingleTravelStipend)}>
          Delete
          </MenuItem>
        </ContextMenu>
      </div>
      <div className="card_title">
        {location}
        {' '}
      </div>
      <div className="card_stipend">
        &#36;
        {stipend}
        {' '}
      </div>
      <p className="card_p">Daily Stipend</p>
    </div>
  );

};


export const TravelStipendsCards = (
  { stipends, openModal,fetchSingleTravelStipend }
) => {

  return(
    <div>
      {
        stipends.map(stipend => {
          return (
            <TravelStipendsCard
              key={stipend.id}
              id={stipend.id}
              location={stipend.center.location}
              stipend={stipend.amount}
              openModal={openModal}
              fetchSingleTravelStipend={fetchSingleTravelStipend}
            />
          );
        })
      }
    </div>
  );
};

TravelStipendsCard.propTypes = {
  location: PropTypes.string.isRequired,
  fetchSingleTravelStipend: PropTypes.func.isRequired,
  stipend: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};


TravelStipendsCards.propTypes = {
  stipends: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
  fetchSingleTravelStipend: PropTypes.func.isRequired,
};

TravelStipendsCard.propTypes = {
  location: PropTypes.string.isRequired,
  stipend: PropTypes.number.isRequired
};


export default withLoading(TravelStipendsCards, RequestPlaceholder);
