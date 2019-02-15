import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import LoadingTravelReasonsTable from './TravelReasonsTable';
import TemplatesPagination from '../ReminderSetup/TemplatesPagination';
import NoTemplates from '../ReminderSetup/NoTemplates';

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
    const { listTravelReasons: {travelReasons, pagination} } = this.props;
    const { currentPage,  pageCount } = pagination;
    return (
      travelReasons && travelReasons.length > 0?
        (
          <Fragment>
            <LoadingTravelReasonsTable
              reasons={travelReasons}
            />
            {this.Pagination(currentPage, pageCount, this.onPageChange)}
          </Fragment>
        )
        : <NoTemplates message="No Travel Reasons have been created" />
    );
  }
}

ListTravelReasons.propTypes = {
  fetchAllTravelReasonsAction: PropTypes.func.isRequired,
  listTravelReasons: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default ListTravelReasons;
