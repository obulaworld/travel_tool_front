import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import LoadingTravelReasonsTable from './TravelReasonsTable';
import TemplatesPagination from '../ReminderSetup/TemplatesPagination';

class ListTravelReasons extends Component {
  componentDidMount() {
    const { fetchAllTravelReasonsAction, location: {search} } = this.props;
    fetchAllTravelReasonsAction(search);
  }

  onPageChange = (direction) => {
    const {
      listTravelReasons: {pagination: {currentPage}},
      fetchAllTravelReasonsAction,
      location: {search}
    } = this.props;
    const requestedPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    const query = `${search}${search ? '&' : '?'}page=${requestedPage}`;
    fetchAllTravelReasonsAction(query);
  };

  Pagination = (currentPage, pageCount, onPageChange) => {
    return pageCount && pageCount===1?'': (
      <TemplatesPagination
        currentPage={currentPage ? currentPage : 1}
        pageCount={pageCount ? pageCount : 1}
        onPageChange={onPageChange} />
    );
  };

  render(){
    const {
      listTravelReasons: { travelReasons, pagination, isLoading, reasonDetails, isFetching },
      renderDisplayTravelReasonDetails,
      shouldOpen,
      closeModal,
      modalType,
    } = this.props;
    const { currentPage,  pageCount } = pagination;
    return (
      <Fragment>
        <LoadingTravelReasonsTable
          reasons={travelReasons}
          isLoading={isLoading}
          shouldOpen={shouldOpen}
          closeModal={closeModal}
          modalType={modalType}
          reasonDetails={reasonDetails}
          isFetching={isFetching}
          renderDisplayTravelReasonDetails={renderDisplayTravelReasonDetails}
        />
        {!isLoading && pageCount === 0 ? null : this.Pagination(currentPage, pageCount, this.onPageChange)}
      </Fragment>
    );
  }
}

ListTravelReasons.propTypes = {
  fetchAllTravelReasonsAction: PropTypes.func,
  listTravelReasons: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  renderDisplayTravelReasonDetails: PropTypes.func,
  shouldOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  modalType: PropTypes.string,
};

ListTravelReasons.defaultProps = {
  renderDisplayTravelReasonDetails: null,
  shouldOpen: false,
  closeModal: null,
  fetchAllTravelReasonsAction: null,
  modalType: '',
};

export default ListTravelReasons;
