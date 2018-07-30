import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AppHeader from "../../components/app-header/AppHeader";
import "../App/App.scss";
import * as types from '../../redux/constants/actionTypes';

class IndexPage extends Component {
  render() {
    const { click, changeButton } = this.props;

    return (
      <div>
        <AppHeader />
        <button type="button" className="Btn-log">
          <Link to="/login" style={{ textDecoration: 'none', color:"white" }}>
          Login
          </Link>
        </button>
        {click ? (
          <button
          type="button"
          style={{ textDecoration: 'none', color:'white', height:'100%' }}
          className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent Btn-log"          
          >
          I HAVE BEEN CLICKED
          </button>
        ):(
          <button type="button" onClick={changeButton} style={{ textDecoration: 'none', color:"white" }} className="Btn-log">
          CLICK ME
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        click: state.click
    };
};

const mapDispatchToProps = dispatch => {
    return {
      changeButton: () => { dispatch({ type: types.CLICK_BUTTON }); }
    };
};

// connect the component to the provided store
export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);


