import React from 'react';
import PropTypes from 'prop-types';
import returnTrip from '../../helper/generateTripType';

const InfoCenter = ({ request }) => {
  const {
    name, tripType, picture, stipend
  } = request;
  return (
    <div className="row">
      <div className="partition">
        <p className="text--grey">Requested By</p>
        <p className="text--blue with-image">
          <span className="user-image" style={{ backgroundImage: `url(${picture})` }} />
          {name}
        </p>
      </div>
      <div className="partition">
        <p className="text--grey">Request Type</p>
        <p className="text--blue">
          {returnTrip(tripType)}
        </p>
      </div>
      <div className="partition">
        <p className="text--grey">
          Total Stipend
          <i role="presentation" title="info">i</i>
        </p>
        <p className="text--blue">
          { stipend && `$${stipend}` || 'N/A'}
        </p>
      </div>
    </div>
  );
};

InfoCenter.propTypes = {
  request: PropTypes.object.isRequired
};

export default InfoCenter;
