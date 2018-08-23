import React, { PureComponent } from 'react';
import {PropTypes} from 'prop-types';
import PageHeader from '../PageHeader';
import ButtonGroup from '../button-group/ButtonGroup';
import HeaderPagination from '../Pagination/HeaderPagination';
import './Request.scss';

class RequestPanelHeader extends PureComponent {
  render() {
    const {toggleNewRequestModal} = this.props;
    return (
      <div className="request-panel-header">
        <PageHeader title="REQUESTS" actionBtn="New Request" toggleNewRequestModal={toggleNewRequestModal} />
        <div className="open-requests">
          <ButtonGroup buttonsType="requests" />
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
