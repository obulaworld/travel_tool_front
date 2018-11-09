import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../PageHeader';
import './DocumentsHeader.scss';

class DocumentsHeader extends PureComponent {
  render() {
    const { openModal } = this.props;
    return (
      <div className="document-panel-header">
        <PageHeader
          title="DOCUMENTS"
          actionBtn="Add File"
          openModal={openModal}
        />
      </div>
    );
  }
}

DocumentsHeader.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default DocumentsHeader;
