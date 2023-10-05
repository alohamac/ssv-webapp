/*****************************************************************
 * File: servicesObj.js
 *
 * This file holds the object to allow for easy manipulation of
 * services offered data.
 *****************************************************************/

import Image1 from "../static/images/services-offered-img1.jpg";
import Image2 from "../static/images/services-offered-img2.png";
import Image3 from "../static/images/services-offered-img3.png";
import Image4 from "../static/images/services-offered-img4.png";

// TODO: Admins/Mods ability to change texts and images on the website
const ServicesObj = {
  service1: {
    serviceName: "Service Name goes here",
    serviceText:
      "This is a description for the service. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    serviceFor: "Who is this service for?",
    serviceForText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    img: Image1,
    alt: "Ball in Hand",
  },
  service2: {
    serviceName: "Service Name goes here",
    serviceText:
      "This is a description for the service. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    serviceFor: "Who is this service for?",
    serviceForText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    img: Image2,
    alt: "Touching Fingers",
  },
  service3: {
    serviceName: "Service Name goes here",
    serviceText:
      "This is a description for the service. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    serviceFor: "Who is this service for?",
    serviceForText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    img: Image3,
    alt: "Glistening Phone",
  },
  service4: {
    serviceName: "Service Name goes here",
    serviceText:
      "This is a description for the service. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    serviceFor: "Who is this service for?",
    serviceForText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
    img: Image4,
    alt: "Web Connected",
  },
};

//TODO: If we allow for admin to change this data through a console, then we will need
// to remove this (I think);
Object.freeze(ServicesObj); //Don't allow for accidental changes

export default ServicesObj;
