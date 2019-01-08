import React, { PureComponent } from 'react';
import  PropTypes from 'prop-types';
import PageHeader from '../PageHeader';
import './ReadinessHeader.scss';

class ReadinessPanelHeader extends PureComponent {

  openVisaModal = () => {
    const { openModal } = this.props;
    openModal(true, 'add visa');
  };

  render() {
    return (
      <PageHeader
        title="Travel Readiness"
        actionBtn="Add Visa"
        openModal={this.openVisaModal}
      />
    );
  }
}

ReadinessPanelHeader.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default ReadinessPanelHeader;
