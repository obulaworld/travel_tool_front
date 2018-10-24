/* eslint react/jsx-one-expression-per-line: 0 */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import TravelChecklistItem from './TravelCheckListItem';
import countryUtils from '../../helper/countryUtils';
import './TravelCheckList.scss';


class TravelChecklist extends PureComponent {
  renderCheckList = (list, keyIndex) => {
    const countryFlagUrl = countryUtils.getCountryFlagUrl(list.destination);
    return (
      <div key={keyIndex} className="travelCheckList__destination">
        <div className="travelCheckList__destination-name">
          <div className="travelCheckList__destination-flag" alt="country flag" style={{ backgroundImage: `url(${countryFlagUrl})` }} />
          {list.destination}
        </div>
        {
          list.checklist.length > 0 &&
            list.checklist.map((item) => (
              <TravelChecklistItem key={`${item.id}`} checklistItem={item} />
            ))
        }
      </div>
    );
  }
  renderTravelCheckLists = () => {
    const { travelChecklists } = this.props;
    return (
      <div className="travelCheckList">
        {
          travelChecklists.length
            ? travelChecklists.map((list, i) => this.renderCheckList(list, i))
            : (
              <p className="travelCheckList__not-found">
                There are no checklist items for your selected destination(s). Please contact your Travel Department.
              </p>
            )
        }
      </div>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderTravelCheckLists()}
      </Fragment>
    );
  }
}

TravelChecklist.propTypes = {
  travelChecklists: PropTypes.array.isRequired
};

export default TravelChecklist;
