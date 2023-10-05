/********************************************
 * File: iconTimes.js
 *
 * A component dedicated to rendering an Times
 * in place of any sort of icons
 *
 **********************************************/

import React from "react";
import "../static/style.css";

class IconTimes extends React.Component {
  render() {
    return (
      <div className="icon-times-wrapper">
        <button onClick={this.props.toggleMobileMenu} className="icon-times">
          <div className="line line1"></div>
          <div className="line line2"></div>
        </button>
      </div>
    );
  }
}

export default IconTimes;
