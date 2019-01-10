import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import AddVisaForm from '../Forms/TravelReadinessForm/AddVisaForm';
import './Visa.scss';

export class CreateVisaModal extends Component{
  render(){
    return(
      <Fragment>
        <div className="visa-modal">
          <div className="visa-title">
            <div className="add-visa">
              <span>Add Visa</span>
              <AddVisaForm />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

}

const mapStateToProps = state => ({
  modal: state.modal,
});

export default connect(mapStateToProps)(CreateVisaModal);
