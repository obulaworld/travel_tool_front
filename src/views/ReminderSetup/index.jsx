import React, { Fragment } from 'react';
import PageHeader from '../../components/PageHeader';
import Base from '../Base';

class ReminderSetup extends Base{

  render() {
    const { history } = this.props;
    return (
      <Fragment>
        <div className="readiness-header">
          <PageHeader
            title="EMAIL TEMPLATES"
            actionBtn="CREATE NEW"
            actionBtnClickHandler={() => {
              history.push('/settings/reminder-setup/create');
            }}
          />
        </div>
      </Fragment>
    );
  }
}

export default ReminderSetup;
