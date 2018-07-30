import React, { Component } from "react";

import "./Login.scss";

class Login extends Component {
  render() {
    return (
      <div>
        <header className="Login-header">
          <h1 className="App-title">
            Hello User, Please login
          </h1>
        </header>
        <div style={{ margin: "70px 500px" }}>
          <form>
            <div className="log-in-form">
              Email:
              <input type="text" name="email" value="" id="email" />
            </div>
            <div className="log-in-form">
              Password:
              <input
                type="text"
                name="password"
                value=""
                id="password"
              />
            </div>
            <div className="log-in-form">
              <button
                type="submit"
                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
                style={{ marginTop: "20%" }}
              >
                LogIn
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
