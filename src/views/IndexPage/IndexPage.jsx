import React, { Component } from "react";

import { Link } from "react-router-dom";

import AppHeader from "../../components/app-header/AppHeader";
import "../App/App.scss";

class IndexPage extends Component {
  render() {
    return (
      <div>
        <AppHeader />
        <button type="button" className="Btn-log">
          <Link to="/login" style={{ textDecoration: 'none', color:"white" }}>
          Login
          </Link>
        </button>
      </div>
    );
  }
}

export default IndexPage;
