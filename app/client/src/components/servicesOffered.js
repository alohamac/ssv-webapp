/*****************************************************************
 * File: servicesOffered.js
 *
 * This is the top level file responsible for rendering services
 *  offered.
 *
 * We render a <Service> component which handles the rendering of
 *  an individual service offered.
 * We alternate passing {false} and {true} to alternate rendering
 *  img--text and text--img
 *
 * All services are stored in a <ServiceObj> within servicesObj.js
 *  When services need updated, this is where we handle the necessary
 *  data required for a service.
 *
 * To update a service:
 *  1. Enter the necessary data in servicesOffered.js
 *  2. Add a <Service> in this file, referencing the respective
 *    array elements.
 *
 * TODO: Find way to loop through the ServisesObj to render all the
 *  elements in a more automated fashion, to allow less manipulation
 *  when services are altered.
 *****************************************************************/

import React from "react";
import Service from "./service";
import ServicesObj from "./servicesObject";

class ServicesOffered extends React.Component {
  render() {
    return (
      <div id="servicesOfferedPage" className="container">
        <h1 id="servicesOfferedHeader" className="page-header">Services Offered</h1>

        {/* Service 1 */}
        <Service
          serviceName={ServicesObj["service1"]["serviceName"]}
          serviceText={ServicesObj["service1"]["serviceText"]}
          serviceFor={ServicesObj["service1"]["serviceFor"]}
          serviceForText={ServicesObj["service1"]["serviceForText"]}
          img={ServicesObj["service1"]["img"]}
          alt={ServicesObj["service1"]["alt"]}
          reverse={false}
        />

        {/* Service 2 */}
        <Service
          serviceName={ServicesObj["service2"]["serviceName"]}
          serviceText={ServicesObj["service2"]["serviceText"]}
          serviceFor={ServicesObj["service2"]["serviceFor"]}
          serviceForText={ServicesObj["service2"]["serviceForText"]}
          img={ServicesObj["service2"]["img"]}
          alt={ServicesObj["service2"]["alt"]}
          reverse={true}
        />

        {/* Service 3 */}
        <Service
          serviceName={ServicesObj["service3"]["serviceName"]}
          serviceText={ServicesObj["service3"]["serviceText"]}
          serviceFor={ServicesObj["service3"]["serviceFor"]}
          serviceForText={ServicesObj["service3"]["serviceForText"]}
          img={ServicesObj["service3"]["img"]}
          alt={ServicesObj["service3"]["alt"]}
          reverse={false}
        />

        {/* Service 4 */}
        <Service
          serviceName={ServicesObj["service4"]["serviceName"]}
          serviceText={ServicesObj["service4"]["serviceText"]}
          serviceFor={ServicesObj["service4"]["serviceFor"]}
          serviceForText={ServicesObj["service4"]["serviceForText"]}
          img={ServicesObj["service4"]["img"]}
          alt={ServicesObj["service4"]["alt"]}
          reverse={true}
        />
      </div>
    ); //return
  } //render
} //class

export default ServicesOffered;
