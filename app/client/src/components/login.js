/*************************************************************
 * File: login.js
 *
 * This file contains the component on what type of account
 * you want to log into; user or employee. 
 */
import React from "react";

class Login extends React.Component {
  render() {
    return (
      // TODO: Admins/Mods ability to change texts and images on the website
      <div style={{fontWeight:600, fontSize:"32px", textAlign:"center"}}>
        <a href="/userLogin">User Log-in</a>
        <br/>
        <a href="/employeeLogin">Employee Log-in</a>
      </div>
    );
  }
}

export default Login;
