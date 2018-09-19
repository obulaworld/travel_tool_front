import React, { PureComponent, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import Overlay from './overlay/Overlay';
import closeButton from '../../images/icons/close.svg';
import './_modal.scss';

class Modal extends PureComponent {
  static propTypes = {
    visibility: PropTypes.oneOf(['visible', 'invisible']).isRequired,
    closeModal: PropTypes.func,
    title: PropTypes.string,
    modalId: PropTypes.string,
    modalContentId: PropTypes.string,
    modalBar: PropTypes.object,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.object)
    ]).isRequired
  };

  renderModalHeader = () => {
    const { title, closeModal, modalBar } = this.props;
    return (
      <div className="modal-title-bar">
        <div className="modal-title-text">
          <div>
            {title}
          </div>
          <div className="lable-text modal-bar">
            {modalBar}
          </div>
        </div>
        <button type="button" onClick={closeModal} className="modal-close">
          <img alt="close" src={closeButton} />
        </button>
      </div>
    );
  };

  render() {
    const {
      children,
      visibility,
      closeModal,
      title,
      modalId,
      modalContentId
    } = this.props;
    return (
      visibility === 'visible' ? (
        <Fragment>
          <Overlay click={closeModal} className={visibility}>
            <div
              className={`modal ${visibility}`}
              onClick={e => {e.stopPropagation();}} onKeyPress={() => {}}
              id={modalId}
              tabIndex="0"
              role="button">
              {this.renderModalHeader()}
              <div className="modal-content" id={modalContentId}>
                {children}
              </div>
            </div>
          </Overlay>
        </Fragment>
      ) : null
    );
  }
}


Modal.defaultProps = {
  title: '',
  modalId: '',
  modalContentId: '',
  modalBar: <div />,
  closeModal: null,
};

export default Modal;
