import React from 'react';
import {connect} from 'react-redux';
import PageHeader from '../../../components/PageHeader';
import NewEmailTemplateForm from '../../../components/Forms/NewEmailTemplateForm';
import {
  getSingleReminderEmailTemplate,
  updateSingleReminderEmailTemplate
} from '../../../redux/actionCreator/reminderManagementActions';

class UpdateEmailTemplate extends React.Component {
  render(){
    return(
      <div>
        <PageHeader
          addLink
          title="EDIT AN EMAIL TEMPLATE"
          iconLink="/settings/reminder-setup/"
        />
        <NewEmailTemplateForm {...this.props} editing />
      </div>

    );
  }
}
const mapStateToProps = ({ reminderManagement : { updatedEmailTemplate }}) => updatedEmailTemplate;


export default connect(
  mapStateToProps,
  { updateSingleReminderEmailTemplate, getSingleReminderEmailTemplate })(UpdateEmailTemplate);
