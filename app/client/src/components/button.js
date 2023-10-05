/*************************************************************
 * File: button.js
 *
 * A generic button that can be used for 'Action' and 'Cancel'
 *
 * Easily add fonts across the entire project
 */
import React from "react";

class Button extends React.Component {
  render() {
    const { type, onClick, buttonText, id } = this.props;
    return (
      <button 
      id={id} type={type} className="btn btn-primary" onClick={onClick}>
        {buttonText}
      </button>
    );
  }
}
export default Button;
