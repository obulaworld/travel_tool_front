import React, { PureComponent, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
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
    width:  PropTypes.string,
    showOverlay: PropTypes.bool,
    modalBar: PropTypes.object,
    customModalStyles: PropTypes.string,
    closeDeleteCommentModal: PropTypes.func,
    params: PropTypes.string,
    customOverlayStyle: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.object)
    ]).isRequired,
  };


  renderModalHeader = () => {
    const { title, closeModal, modalBar, params, closeDeleteCommentModal, requestId } = this.props;
    let url;
    if (location.pathname.includes('/requests')) {
      url = '/requests/';
    } else {
      url = location.pathname;
    }
    if (requestId) {
      let urlArr = url.split('/');
      url = urlArr.slice(0, urlArr.length - 1).join('/');
    }
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
        {closeDeleteCommentModal ?
          (
            <button type="button" onClick={closeDeleteCommentModal} className="modal-close">
              <img alt="close" src={closeButton} />
            </button>
          )
          :
          (
            (url.includes('/requests')) ?
              (
                <Link to={url}>
                  <button type="button" onClick={closeDeleteCommentModal ? closeDeleteCommentModal : closeModal} className="modal-close">
                    <img alt="close" src={closeButton} />
                  </button>
                </Link>
              ) : (
                <button type="button" onClick={closeDeleteCommentModal ? closeDeleteCommentModal : closeModal} className="modal-close">
                  <img alt="close" src={closeButton} />
                </button>
              )
          )
        }
      </div>
    );
  };

  render() {
    const {
      children,
      visibility,
      width,
      modalId,
      modalContentId,
      showOverlay,
      customOverlayStyle,
      customModalStyles
    } = this.props;

    const overlayStyle = `${visibility} ${customOverlayStyle}`;

    return (
      visibility === 'visible' ? (
        <Fragment>
          <Overlay className={overlayStyle} overlayBackground={!showOverlay ? 'overlayBackground' : ''}>
            <div
              className={`modal ${visibility} ${customModalStyles}`}
              style={{maxWidth: width}}
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

Modal.propTypes = {
  params: PropTypes.string,
  requestId: PropTypes.string,
};

Modal.defaultProps = {
  title: '',
  modalId: '',
  requestId: '',
  width: '',
  modalContentId: '',
  customOverlayStyle: '',
  customModalStyles: '',
  showOverlay: true,
  params: '',
  modalBar: <div />,
  closeModal: null,
  closeDeleteCommentModal: null,
};

export default Modal;
