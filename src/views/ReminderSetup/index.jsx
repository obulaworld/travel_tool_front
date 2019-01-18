import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAllEmailTemplates } from '../../redux/actionCreator/listEmailTemplatesActions';
import ListEmailTemplates from '../../components/ReminderSetup/ListEmailTemplates';
import PageHeader from '../../components/PageHeader';
import Base from '../Base';

class ReminderSetup extends Base{

  render() {
    const { history,fetchTemplates, listEmailTemplatesReducer, location } = this.props;
    return (
      <Fragment>
        <div className="readiness-header">
          <div className="templates-header">
            <PageHeader
              title="EMAIL TEMPLATES"
              actionBtn="CREATE NEW"
              actionBtnClickHandler={() => {
                history.push('/settings/reminder-setup/create');
              }}
            />
          </div>
        </div>
        <ListEmailTemplates
          fetchTemplates={fetchTemplates}
          listEmailTemplatesReducer={listEmailTemplatesReducer}
          location={location}
        />
      </Fragment>
    );
  }
}

ReminderSetup.propTypes = {
  fetchTemplates: PropTypes.func.isRequired,
  listEmailTemplatesReducer: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};
const mapStateToProps = ({listEmailTemplatesReducer}) => ({
  listEmailTemplatesReducer
});
export default connect(mapStateToProps, {fetchTemplates: fetchAllEmailTemplates})(ReminderSetup);
