import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import editIcon from '../../images/edit.svg';
import cancelIcon from '../../images/cancel.svg';

class DocumentTableMenu extends PureComponent {
  handleOpenRenameModal = () => {
    const { document, editDocument, openModal } = this.props;
    editDocument(document);
    openModal('rename document');
  }

  renderEllipsis = (toggleMenu, document) => {
    return (
      <i
        className="fa fa-ellipsis-v"
        id="toggleIcon"
        role="presentation"
        onClick={() => toggleMenu(document)}
      />
    );
  };

  closeMenu = (toggleMenu, document) => {
    return (
      <li
        className="table__menu-list-item cancel"
        id="toggleButton"
        onClick={() => toggleMenu(document)}
        role="presentation"
      >
        <img src={cancelIcon} alt="cancel-icon" className="menu-icon" />
        Cancel
      </li>
    );
  };

  renderDocumentRenameBtn = () => {
    return (
      <li
        className="table__menu-list-item rename"
        id="docRenameBtn"
        onClick={this.handleOpenRenameModal}
        role="presentation"
      >
        <img src={editIcon} alt="rename-icon" className="menu-icon" />
        Rename
      </li>
    );
  }

  renderMenu = () => {
    const { toggleMenu, document, menuOpen } = this.props;
    const openMenu = menuOpen.id === document.id && menuOpen.open;

    return (
      <div>
        {this.renderEllipsis(toggleMenu, document)}
        <div className={`table__menu-container ${openMenu ? 'open' : ''}`}>
          <ul className="table__menu-list doc">
            {this.renderDocumentRenameBtn()}
            {this.closeMenu(toggleMenu, document)}
          </ul>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="menu__container">
        {this.renderMenu()}
      </div>
    );
  }
}

const propTypes = {
  editDocument: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  menuOpen: PropTypes.object.isRequired,
  openModal: PropTypes.func.isRequired,
};

DocumentTableMenu.propTypes = { ...propTypes };

export default DocumentTableMenu;
