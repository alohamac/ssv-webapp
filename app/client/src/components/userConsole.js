/*************************************************************
 * File: userConsole.js
 *
 * This file contains the userConsole component.
 */
import React from "react";

class UserConsole extends React.Component {
    logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.props.history.push("/");
    }
    
    componentDidMount(){
        if (!localStorage.getItem('role') || localStorage.getItem('role') != 'user'){
          this.props.history.push("/login")
        }
    }
    render() {
        return (
            <>
            <h1>Hello {localStorage.getItem("username")}</h1>
            <button onClick={this.logout.bind(this)}>Logout</button>
            </>
        );
    }
}

export default UserConsole;
