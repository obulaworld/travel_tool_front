import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cancelIcon from '../../images/cancel.svg';
import deleteIcon from '../../images/document-delete.svg';
import editIcon from '../../images/edit.svg';

class DocumentTableMenu extends PureComponent {
  openDeleteModal = (documentId) => () => {
    const { toggleMenu, setItemToDelete, document } = this.props;
    setItemToDelete(documentId, document.name)();
    toggleMenu(document);
  }

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

  renderDocumentDeleteBtn = () => {
    const { document } = this.props;
    return (
      <li
        className="table__menu-list-item"
        id="deleteBtn"
        onClick={this.openDeleteModal(document.id)}
        role="presentation"
      >
        <img src={deleteIcon} alt="rename-icon" className="menu-icon" />
        Delete
      </li>
    );
  }

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
            {this.renderDocumentDeleteBtn()}
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
  setItemToDelete: PropTypes.func.isRequired,
};

DocumentTableMenu.propTypes = { ...propTypes };

export default DocumentTableMenu;
