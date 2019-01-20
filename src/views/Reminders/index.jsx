import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import PageHeader from '../../components/PageHeader';
import './Reminder.scss';

export class Reminders extends Component{

  constructor(props) {
    super(props);
    this.state ={};
  }

  render() {
    const { history } = this.props;
    return (
      <Fragment>
        <PageHeader
          title="REMINDER CONDITIONS"
          actionBtn="CREATE NEW"
          actionBtnClickHandler={() => {
            history.push('/settings/reminders/create');
          }}
        />
      </Fragment>
    );
  }
}

Reminders.propTypes = {
  history: PropTypes.object.isRequired,
};

export default connect()(Reminders);
