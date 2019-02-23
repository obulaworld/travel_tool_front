import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import withLoading from '../Hoc/withLoading';
import listTravelReasonsPlaceHolder from '../Placeholders/TravelReasonsPlaceholders';
import ViewTravelReasonDetailsModal from './viewTravelReasonDetailsModal';
import NoTemplates from '../ReminderSetup/NoTemplates';

const className = 'mdl-data-table__cell--non-numeric';

export class TravelReasonsTable extends Component {
  ReasonsTableHead () {
    return (
      <thead>
        <tr>
          <th className={`${className} table__head`}>Reason</th>
          <th className={`${className} table__head pl-sm-100d description-left`}><span /></th>
          <th className={`${className} table__head pl-sm-100d description-left`}>Created By</th>
          <th className={`${className} table__head pl-sm-100d description-left`}><span /></th>
          <th className={`${className} table__head`}>Created On</th>
          <th className={`${className} table__head`} />
        </tr>
      </thead>
    );
  }

  ReasonsTableRow({key, title, createdOn, createdBy: {fullName}}) {
    const { renderDisplayTravelReasonDetails, shouldOpen, closeModal, modalType, reasonDetails, isFetching } = this.props;
    return(
      <Fragment key={key}>
        <tr className="table__rows">
          <td className={`${className} table__data readiness__cell-name`}>
            <span
              onClick={() => renderDisplayTravelReasonDetails(key)}
              role="presentation" className="document-name"
            >
              {_.capitalize(title)}
            </span>
            <Fragment>
              <ViewTravelReasonDetailsModal
                shouldOpen={shouldOpen} reasonDetails={reasonDetails} id={key}
                closeModal={closeModal} modalType={modalType} isFetching={isFetching}
              />
            </Fragment>
          </td>
          <td className={`${className} table__data`} />
          <td className={`${className} table__data`}>{fullName}</td>
          <td className={`${className} table__data`} />
          <td className={`${className} table__data`}>
            {moment(new Date(createdOn)).format('DD-MM-YYYY')}
          </td>
          <td className={`${className} table__data`}>
            <i
              className="fa fa-ellipsis-v on"
              id="toggleIcon" role="presentation"
            />
          </td>
        </tr>
      </Fragment>
    );
  }

  ReasonsTableBody ({reasons}) {
    return (
      <tbody className="table__body">
        {
          reasons.map(reason => {
            return(
              this.ReasonsTableRow({
                key: reason.id,
                title: reason.title,
                createdOn: reason.createdAt,
                createdBy: reason.creator})
            );
          })
        }
      </tbody>
    );
  }

  render() {
    const { reasons } = this.props;
    return (
      reasons && reasons.length > 0 ?
        (
          <div className="list-reasons">
            <div className="table__container">
              <table className="mdl-data-table mdl-js-data-table readiness-table">
                {this.ReasonsTableHead()}
                {this.ReasonsTableBody({ reasons })}
              </table>
            </div>
          </div>
        )
        : <NoTemplates message="No Travel Reasons have been created" />
    );
  }
}

TravelReasonsTable.propTypes = {
  reasons: PropTypes.array,
  renderDisplayTravelReasonDetails: PropTypes.func,
  shouldOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  modalType: PropTypes.string,
  reasonDetails: PropTypes.object,
  isFetching: PropTypes.bool
};

TravelReasonsTable.defaultProps = {
  reasons: [],
  renderDisplayTravelReasonDetails: null,
  shouldOpen: false,
  closeModal: null,
  modalType: '',
  reasonDetails: {},
  isFetching: false
};

export default withLoading(TravelReasonsTable, listTravelReasonsPlaceHolder);
