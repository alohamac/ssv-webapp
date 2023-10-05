/*************************************************************
 * File: employeeLogin.js
 *
 * This file contains the employee login component.
 */

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../static/style.css";
import withAuth from "./withAuth";
import EmployeeConsole from "./employeeConsole";

export default class EmployeeForm extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeVerificationCode = this.onChangeVerificationCode.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onVerify = this.onVerify.bind(this);
    this.state = {
      username: "",
      password: "",
      verificationCode: "",
      invalidLogin: false,
      invalidVerify: false,
      verified: false,
      submitted: false,
      tempToken: "",
      tempUser: "",
    };
  }

  componentDidMount() {
    if (localStorage.getItem("username")) {
      this.props.history.push("/employeeConsole");
  // HOTFIX01
//   componentDidMount(){
//     if (localStorage.getItem('role') && (localStorage.getItem('role') == 'admin' || localStorage.getItem('role') == 'mod')){
//       this.props.history.push("/employeeConsole")
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

  onChangeVerificationCode(e) {
    this.setState({
      verificationCode: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    const employee = {
      username: this.state.username.replace(/\s/g, ""),
      password: this.state.password,
    };
    await axios
      .get(
        "http://localhost:5000/employees/login/" +
          employee.username +
          "/" +
          employee.password
      )
      .then(
        (response) => {
          this.setState({
            invalidLogin: false,
            submitted: true,
          }); // will show verification box
        },
        (error) => {
          this.setState({ invalidLogin: true });
          console.log(error);
        }
      );
  }

  async onVerify(e) {
    e.preventDefault();
    await axios
    // HOTFIX01
//       .get(
//         "http://localhost:5000/employees/login/verify/" +
//           this.state.username +
//           "/" +
//           this.state.verificationCode
//       )
//       .then(
//         (response) => {
//           localStorage.setItem("username", response.data.employee.username);
//           localStorage.setItem("token", response.data.token);
//           this.props.history.push("/employeeConsole");
//         },
//         (error) => {
//           this.setState({ invalidVerify: true });
//           console.log(error);
//         }
//       );
    .get("http://localhost:5000/employees/login/verify/"+ this.state.username + "/" + this.state.verificationCode)
    .then((response) =>{
      localStorage.setItem('username', response.data.employee.username)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('role', response.data.employee.role)
      this.props.history.push('/employeeConsole')
    }, (error) =>{
      this.setState({invalidVerify: true})
      console.log(error)
    })
  }

  render() {
    return (
      // TODO: Admins/Mods ability to change texts and images on the website
      <>
        <h1 style={{ fontWeight: 600, fontSize: "42px", textAlign: "center" }}>
          Employee Log In
        </h1>
        <div style={{ textAlign: "center" }}>
          {this.state.invalidLogin === true && (
            <p id="flash-message" className="invalid-flash">
              Invalid login credentials
            </p>
          )}
          {!this.state.submitted && (
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
              <a href="employeeRegistration">Register</a>
            </form>
          )}
          {this.state.submitted && (
            <form id="verify-form" onSubmit={this.onVerify}>
              {this.state.invalidVerify === true && (
                <p id="flash-message" className="invalid-flash">
                  Invalid Verification Code
                </p>
              )}
              <p>Please use the authenticator app to verify login.</p>
              <label>
                <div className="login-form">
                  Verification Code
                  <br />
                  <input
                    type="text"
                    id="verification"
                    className="form-textbox"
                    value={this.state.verificationCode}
                    onChange={this.onChangeVerificationCode}
                    required
                  />
                </div>
              </label>
              <button type="verify" id="verify" className="submit">
                Verify
              </button>
            </form>
          )}
        </div>
      </>
    );
  }
}
