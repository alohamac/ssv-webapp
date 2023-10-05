/*************************************************************
 * File: userLogin.js
 *
 * This file contains the user login component. Renders the UI
 */

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
// import "../index.css"

export default class UserLoginForm extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      username: "",
      password: "",
      invalidLogin: false,
      submitted: false,
      tempToken: "",
      tempUser: "",
    };
  }

  componentDidMount() {
    if (
      localStorage.getItem("role") &&
      localStorage.getItem("role") == "user"
    ) {
      this.props.history.push("/userConsole");
    }
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username.replace(/\s/g, ""),
      password: this.state.password,
    };
    await axios
      .get(
        "http://localhost:5000/user/login/" +
          user.username +
          "/" +
          user.password
      )
      .then(
        (response) => {
          this.setState({
            invalidLogin: false,
            submitted: true,
          }); // will show verification box
          console.log(response.data);
          localStorage.setItem("username", response.data.user.username);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", "user");
          this.props.history.push("/userConsole");
        },
        (error) => {
          this.setState({ invalidLogin: true });
          console.log(error);
        }
      );
  }

  render() {
    return (
      <>
        <h1 style={{ fontWeight: 600, fontSize: "42px", textAlign: "center" }}>
          User Log In
        </h1>
        <div style={{ textAlign: "center" }}>
          {this.state.invalidLogin === true && (
            <p id="flash-message" className="invalid-flash">
              Invalid login credentials
            </p>
          )}
          <form id="login-form" onSubmit={this.onSubmit}>
            <label>
              <div className="login-form">
                Username
                <br />
                <input
                  type="text"
                  id="username"
                  className="form-textbox"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  required
                />
              </div>
            </label>
            <label>
              <div className="login-form">
                Password
                <br />
                <input
                  type="password"
                  id="password"
                  className="form-textbox"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  required
                />
              </div>
            </label>
            <button type="submit" id="submit" className="submit">
              Submit
            </button>
            <br />
            <a href="userRegistration">Register</a>
          </form>
        </div>
      </>
    );
  }
}
