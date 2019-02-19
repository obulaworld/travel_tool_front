import React from 'react';
import './TravelStipends.scss';
import PropTypes from 'prop-types';
import withLoading from '../Hoc/withLoading';
import RequestPlaceholder from '../Placeholders/RequestsPlaceholder';


export const TravelStipendsCard = ({location, stipend}) =>
  (
    <div className="card">
      <i
        className="fa fa-ellipsis-v on card_icon"
        id="toggleIcon"
        role="presentation"
      />
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


export const TravelStipendsCards = (
  { stipends }
) => {

  return(
    <div>
      {
        stipends.map(stipend => {
          return (
            <TravelStipendsCard
              key={stipend.id}
              location={stipend.center.location}
              stipend={stipend.amount}
            />
          );
        })
      }
    </div>
  );
};


TravelStipendsCards.propTypes = {
  stipends: PropTypes.array.isRequired
};

TravelStipendsCard.propTypes = {
  location: PropTypes.string.isRequired,
  stipend: PropTypes.number.isRequired
};

export default withLoading(TravelStipendsCards, RequestPlaceholder);
