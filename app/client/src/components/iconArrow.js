/********************************************
 * File: iconArrow.js
 *
 * A component dedicated to rendering an arrow
 * in place of any sort of icons
 *
 * Currently supports an arrow pointing Up, Down,
 * Left, Right
 **********************************************/

import React from "react";

class IconArrow extends React.Component {
  render() {
    if (this.props.direction === "left")
      return <div className="icon-arrow icon-arrow-left"></div>;
    else if (this.props.direction === "right")
      return <div className="icon-arrow icon-arrow-right"></div>;
    else if (this.props.direction === "up")
      return <div className="icon-arrow icon-arrow-up"></div>;
    else if (this.props.direction === "down")
      return <div className="icon-arrow icon-arrow-down"></div>;
  }
}

export default IconArrow;
