
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RequestsModal from '../RequestsModal/RequestsModal';
import Modal from '../modal/Modal';
import { openModal, closeModal } from '../../redux/actionCreator/modalActions';

export class RouterModal extends Component {
    state = {
      viewRequestDetails: ''
    }
    componentDidMount() {
      const {match: {params}, openModal} = this.props;
      this.handleViewRequest(params);
      openModal(true, 'notification detail');
    }
    
    handleViewRequest = (params) =>{
      this.setState({viewRequestDetails: params.requestId});
        
    }
    render() { 
      const { viewRequestDetails } = this.state;
      const { closeModal, shouldOpen, modalType, match:{url} } = this.props;
      return (
        <Modal
          width="1000px"
          params={url}
          closeModal={closeModal}
          visibility={(shouldOpen && modalType === 'notification detail') ? 'visible' : 'invisible'}
          title={viewRequestDetails}
          symbol="#"
          description="Request Details"
          modalBar={(
            <div className="table__modal-bar-text">
                Manager stage
            </div>
          )}
        >
          <RequestsModal 
            requestId={viewRequestDetails}
          />
        </Modal>
    
      );
    }
}

RouterModal.propTypes = {
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  shouldOpen: PropTypes.bool,
  modalType: PropTypes.string
};

RouterModal.defaultProps = {
  shouldOpen: false,
  modalType: ''
};

const mapStateToProps = ({auth, modal}) => ({
  user: auth.user,
  ...modal.modal
});
  
const mapDispatchToProps = {
  openModal,
  closeModal,
};
 
export default connect(mapStateToProps, mapDispatchToProps)(RouterModal);
