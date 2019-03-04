import React from 'react';
import formatDate from '../../helper/formatDate';

export default ({ trips }) => trips.map((trip) => {
  const {
    id, accommodationType, departureDate, returnDate, origin,
    destination
  } = trip;
  return (
    <div className="row" key={id}>
      <div className="partition">
        <p className="text--grey">Flight Route</p>
        <p className="text--black">
          {`${origin.split(',')[0]}-${destination.split(',')[0]}`}
        </p>
      </div>
      <div className="partition">
        <p className="text--grey">Travel Dates</p>
        <p className="text--black">
          {formatDate(departureDate, returnDate)}
        </p>
      </div>
      <div className="partition">
        <p className="text--grey">Accommodation</p>
        <p className="text--black">
          {accommodationType}
        </p>
      </div>
    </div>
  );
});
