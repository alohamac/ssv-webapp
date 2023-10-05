/********************************************
 * File: iconBars.js
 *
 * A component dedicated to rendering an Bars
 * in place of any sort of icons
 *
 **********************************************/

import React from "react";

class IconBars extends React.Component {
  render() {
    return (
      <button
        className="icon-bars-wrapper"
        onClick={this.props.toggleMobileMenu}
      >
        <div className="icon-bars"></div>
        <div className="icon-bars"></div>
        <div className="icon-bars"></div>
      </button>
    );
  }
}

export default IconBars;
