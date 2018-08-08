import React, { PureComponent } from 'react';
import './_pagination.scss';
import PropTypes from 'prop-types';

class Pagination extends PureComponent {
  renderButton(id, disabled, page, direction) {
    const { onPageChange } = this.props;
    return (
      <button
        id={id}
        className="pagination__button"
        type="button"
        disabled={disabled}
        onClick={() => onPageChange(page)}>
        { direction }
      </button>
    );
  }

  renderPage(currentPage, pageCount) {
    return (
      <div className="pagination__items">
        <span className="pagination__page">
          Page
        </span>
        <div className="pagination__current-page" id="current-page">
          { currentPage }
        </div>
          of
        <span className="pagination__all-pages" id="page-count">
          { pageCount }
        </span>
      </div>
    );
  }

  render() {
    const { currentPage, pageCount } = this.props;
    const previousButtonDisabled = currentPage === 1 ? true: false;
    const nextButtonDisabled = currentPage === pageCount ? true: false;
    const previousPage = currentPage - 1;
    const nextPage = currentPage + 1;

    return (
      <div>
        {
          pageCount > 0
            ? (
              <div className="pagination">
                { this.renderButton('previous-button', previousButtonDisabled, previousPage, 'Previous') }
                { this.renderPage(currentPage, pageCount) }
                { this.renderButton('next-button', nextButtonDisabled, nextPage, 'Next') }
              </div>
            )
            : null
        }
      </div>
    );
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
