import React from 'react';

export default ({ trips }) =>  {
  return trips.map((trip) => {
    const reason = trip.otherTravelReasons || (trip.reasons || {}).title || 'N/A';
    const className = reason && reason.split(' ').length > 1
      ? 'text--grey' : 'text--black';
    return (
      <div className="row" key={trip.id}>
        <p className="text--grey">Travel Reason</p>
        <p className={className}>{reason}</p>
      </div>
    );
  });
};
