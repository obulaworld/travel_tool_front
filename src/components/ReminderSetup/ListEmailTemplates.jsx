import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import WithLoadingEmailTemplatesTable from './EmailTemplatesTable';
import TemplatesPagination from './TemplatesPagination';
import NoTemplates from './NoTemplates';
import TemplateDetailsModal from './TemplateDetailsModal';

class ListEmailTemplates extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {fetchTemplates, location: {search}} = this.props;
    fetchTemplates(search);
  }

  onPageChange = (previousOrNext) => {
    const {
      fetchTemplates, listEmailTemplatesReducer: {pagination: {currentPage}},
      location: {search}
    } = this.props;
    fetchTemplates(`${search}${search ? '&' : '?'}page=${previousOrNext === 'previous' ? currentPage - 1 : currentPage + 1}`);
  };

  render() {
    const {
      listEmailTemplatesReducer: {templates, pagination, selectedTemplate},
      openModal, closeModal, modalType, shouldOpen,
      fetchOneTemplate, setItemToDisable
    } = this.props;
    const {pageCount, currentPage} = pagination;
    return (
      <Fragment>
        {templates.length > 0 ? (
          <div>
            <TemplateDetailsModal
              closeModal={closeModal} modalType={modalType}
              shouldOpen={shouldOpen} templates={templates}
              selectedTemplate={selectedTemplate} />
            <WithLoadingEmailTemplatesTable
              templates={templates}
              setItemToDisable={setItemToDisable}
              openModal={openModal}
              fetchOneTemplate={fetchOneTemplate}
            />
            <TemplatesPagination
              onPageChange={this.onPageChange}
              pageCount={pageCount ? pageCount : 1}
              currentPage={currentPage ? currentPage : 1}
            />
          </div>
        ) :
          (<NoTemplates />)}
      </Fragment>
    );
  }
}

ListEmailTemplates.propTypes = {
  fetchTemplates: PropTypes.func.isRequired,
  listEmailTemplatesReducer: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  fetchOneTemplate: PropTypes.func.isRequired,
  setItemToDisable: PropTypes.func.isRequired,
};

ListEmailTemplates.defaultProps = {
  modalType: '',
};

export default ListEmailTemplates;
