import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TemplateDetailsForm from '../Forms/NewEmailTemplateForm/TemplateDetailsForm';
import Modal from '../modal/Modal';


class TemplateDetailsModal extends Component {

    render = () => {
      const { closeModal, modalType, shouldOpen, selectedTemplate } = this.props;
      return(
        <div>
          <Modal
            customModalStyles="template-details"
            closeModal={closeModal} width="504px"
            visibility={(shouldOpen && (modalType === 'template details'))
              ? 'visible' : 'invisible'}
            title="View Details">
            <TemplateDetailsForm closeModal={closeModal} selectedTemplate={selectedTemplate} />
          </Modal>
        </div>
      );
    };
}

TemplateDetailsModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalType: PropTypes.string,
  shouldOpen: PropTypes.bool.isRequired,
  selectedTemplate: PropTypes.object.isRequired
};

TemplateDetailsModal.defaultProps = {
  modalType: '',
};

export default TemplateDetailsModal;
