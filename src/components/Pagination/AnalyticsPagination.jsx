import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './_analyticsPagination.scss';

class AnalyticsPagination extends PureComponent{
  renderPaginationBtn (direction) {
    const { pagination: {currentPage, pageCount, prevPage}, handlePagination } = this.props;
    return (
      <button
        id={direction}
        className={`pg--button ${(direction === 'Previous' && prevPage < 1 || direction === 'Next' && currentPage === pageCount)
          && 'disabled'}`}
        onClick={()=>{handlePagination(direction);}}
        type="button">
        {direction}
      </button>
    );
  }

  render () {
    const {pagination: {currentPage, pageCount}} = this.props;
    return(
      <div className="pg--container">
        {this.renderPaginationBtn('Previous')}
        <p className="pg--text">
          {`Showing page ${currentPage} of ${pageCount} ${pageCount > 1 ? 'pages' : 'page'}`}
        </p>
        {this.renderPaginationBtn('Next')}
      </div>
    );
  }
}

AnalyticsPagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  handlePagination: PropTypes.func.isRequired
};

export default AnalyticsPagination;
