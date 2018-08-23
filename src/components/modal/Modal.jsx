import React, { PureComponent, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import Overlay from './overlay/Overlay';
import closeButton from '../../images/icons/close.svg';
import './_modal.scss';

class Modal extends PureComponent {
  static propTypes = {
    visibility: PropTypes.oneOf(['visible', 'invisible']).isRequired,
    title: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.object)
    ]).isRequired
  }

  renderModalHeader = () => {
    const {title, toggleModal} = this.props;
    return (
      <div className="modal-title-bar">
        <div className="modal-title-text">
          {title}
        </div>
        <button
          type="button"
          onClick={toggleModal}
          className="modal-close"
        >
          <img alt="close" src={closeButton} />
        </button>
      </div>
    );
  }

  render() {
    const {children, visibility, toggleModal, title} = this.props;

    return (
      <Fragment>
        <Overlay click={toggleModal} className={visibility}>
          <div
            className={`modal ${visibility}`}
            onClick={(e)=>{e.stopPropagation();}}
            onKeyPress={()=>{}}
            tabIndex="0"
            role="button"
          >
            {this.renderModalHeader()}
            <div className="modal-content">
              { children }
            </div>
          </div>
        </Overlay>
      </Fragment>
    );
  }
}

export default Modal;
