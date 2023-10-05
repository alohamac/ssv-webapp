/*****************************************************************
 * File: service.js
 *
 * This component renders one service, image pair in either an
 *   img -- text or
 *   text -- img
 *  depending on whether {true} or {false} is passed from
 *   servicesOffered.js
 *****************************************************************/
import React from "react";

class Service extends React.Component {
  render() {
    const {
      serviceText,
      img,
      alt,
      serviceName,
      serviceFor,
      serviceForText,
      reverse,
    } = this.props;

    /*****************************************************************
     * Use of a ternary operator to alternate rendering
     * img -- text and
     * text -- img
     * for each row.
     *
     * Note: Requires altering the @reverse prop passed in from
     *  @servicesOffered
     *
     *****************************************************************   */
    return (
      <div className="service-container">
        <div className="service-wrapper">
          <div className={reverse ? "service-row img-start" : "service-row"}>
            <div className="service-col1">
              <div className="service-text-wrapper">
                <h1 id="serviceName" className="service-text-header">{serviceName}</h1>
                <p id="serviceText" className="service-text-body">{serviceText}</p>
                <h1 id="serviceFor" className="service-text-header">{serviceFor}</h1>
                <p id="serviceForText" className="service-text-body">{serviceForText}</p>
              </div>
            </div>
            <div className="service-col2">
              <div className="service-img-wrap">
                <img id="serviceImg" className="service-img" src={img} alt={alt}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Service;
