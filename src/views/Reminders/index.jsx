import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ReminderTable from './ReminderTable';
import PageHeader from '../../components/PageHeader';
import {fetchEmailReminder} from '../../redux/actionCreator/emailReminderAction';
import NoEmailReminder from '../../components/EmailReminderSetup/NoEmailReminder';
import './Reminder.scss';
import TemplatesPagination from '../../components/ReminderSetup/TemplatesPagination';

export class Reminders extends Component{
  constructor(props){
    super(props);
    this.state = {
      activeDocument: 'passport'
    };
  }

  componentDidMount() {
    const {fetchEmailReminder} = this.props;
    fetchEmailReminder({document: 'passport'});
  }

  onPageChangeEvent = (previousOrNext) => {
    const { activeDocument: document } = this.state;
    const { fetchEmailReminder, meta: {pagination: {currentPage}} } = this.props;
    const params = {
      page : currentPage + (previousOrNext === 'previous' ? -1 : 1),
      document
    };
    fetchEmailReminder(params);

  };


  isActive = (buttonState) => {
    const {activeDocument} = this.state;
    return activeDocument === buttonState;
  };

  toggleButton = (type) => {
    const {fetchEmailReminder} = this.props;
    fetchEmailReminder({ document: type});
    return this.setState({activeDocument: type});
  };



  renderReminderDocumentButton = (text, active, onclick, total, otherProps) => {

    let className = 'document-button_group';
    return (
      <button
        className={`${className}${active? '__active': '__inactive'}`}
        type="button"
        onClick={onclick}
        {...otherProps}
      >
        {text}
        &ensp;
        <span>
          {total && total !== 0 && total}
        </span>
      </button>
    );
  };


  renderButtonGroup = () => {
    const {meta, history} = this.props;
    return (
      <div className="document_header_group_button">
        <div>
          {this.renderReminderDocumentButton('Passports',
            this.isActive('passport'),
            () =>this.toggleButton('passport'),
            meta.documentCount.Passport || 0,
            {id: 'passportButton'}
          )}

          {this.renderReminderDocumentButton('Visas',
            this.isActive('visa'),
            () =>this.toggleButton('visa'),
            meta.documentCount.Visa || 0,
            {id: 'visaButton'}
          )}
        </div>
        <button
          onClick={() => { history.push('/settings/reminders/create');}}
          type="button"
          className="create-new">
          CREATE NEW
        </button>
      </div>
    );
  };

  render() {
    const { reminders, meta: {pagination} } = this.props;

    return (
      <Fragment>
        <PageHeader
          title="REMINDER CONDITIONS"
        />
        {this.renderButtonGroup()}
        { reminders.length === 0 ?
          <div><NoEmailReminder /></div> :(
            <div>
              {' '}
              <ReminderTable reminders={reminders} />

              <TemplatesPagination
                onPageChange={this.onPageChangeEvent}
                pageCount={pagination.pageCount?pagination.pageCount: 1}
                currentPage={pagination.currentPage? pagination.currentPage: 1}
              />
            </div>
          )
        }


      </Fragment>
    );
  }
}


Reminders.propTypes = {
  history: PropTypes.object.isRequired,
};

const mapStateToProps = ({emailReminders}) => emailReminders;

export default connect(mapStateToProps,
  {
    fetchEmailReminder,
  })(Reminders);
