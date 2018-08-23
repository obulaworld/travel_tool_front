import React, { PureComponent } from 'react';
import PageHeader from '../PageHeader';
import ButtonsGroup from '../button-group/ButtonGroup';
import HeaderPagination from '../Pagination/HeaderPagination';
import '../RequestPanelHeader/Request.scss';

class ApprovalsPanelHeader extends PureComponent {
  render() {

    return (
      <div className="request-panel-header">
        <PageHeader title="APPROVALS" />
        <div className="open-requests">
          <ButtonsGroup buttonsType="approvals" />
          <HeaderPagination />
        </div>
      </div>
    );
  }
}

export default ApprovalsPanelHeader;
