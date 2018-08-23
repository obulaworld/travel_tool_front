import React, { PureComponent } from 'react';
import {PropTypes} from 'prop-types';
import Header from '../header/Header';
import ButtonGroup from '../button-group/ButtonGroup';
import HeaderPagination from '../Pagination/HeaderPagination';
import './Request.scss';

class RequestPanelHeader extends PureComponent {
  render() {
    const {toggleNewRequestModal} = this.props;
    return (
      <div className="request-panel-header">
        <Header toggleNewRequestModal={toggleNewRequestModal} />
        <div className="open-requests">
          <ButtonGroup />
          <HeaderPagination />
        </div>
      </div>
    );
  }
}

RequestPanelHeader.propTypes = {
  toggleNewRequestModal: PropTypes.func.isRequired,
};

export default RequestPanelHeader;
