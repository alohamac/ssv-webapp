import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/home";
import AboutUs from "./components/aboutUs";
import NotFoundPage from "./components/notFound";
import ServicesOffered from "./components/servicesOffered";
import ContactUs from "./components/contactUs";
import NavBar from "./components/navBar";
import EmployeeLogin from "./components/employeeLogin";
import withAuth from "./components/withAuth";
import EmployeeConsole from "./components/employeeConsole";
import RegisterForm from "./components/registerForm";
import viewPendingEmployee from "./components/viewPendingEmployees";
import UserRegistrationForm from "./components/userRegisterForm";
import UserLoginForm from "./components/userLogin";
import UserConsole from "./components/userConsole";
import Login from "./components/login";

class App extends Component {
  render() {
    return (
      <>
        <div className="container-fluid">
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
          <BrowserRouter>
            <NavBar />
            <Switch>
              <Route
                exact
                path="/servicesOffered"
                component={ServicesOffered}
              />
              <Route exact path="/aboutUs" component={AboutUs} />
              <Route exact path="/contactUs" component={ContactUs} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/employeeLogin" component={EmployeeLogin} />
              <Route exact path="/userLogin" component={UserLoginForm}/>
              <Route
                exact
                path="/employeeConsole"
                component={withAuth(EmployeeConsole)}
              />
              <Route exact path="/userConsole" component={withAuth(UserConsole)}/>
              <Route exact path="/viewPendingEmployees" component={withAuth(viewPendingEmployee)} />
              <Route exact path = "/employeeRegistration" component={RegisterForm}/>
              <Route exact path = "/userRegistration" component={UserRegistrationForm}/>
              <Route exact path="/" component={Home} />
              <Route component={NotFoundPage} />
            </Switch>
          </BrowserRouter>
        </div>
      </>
    );
  }
}

export default App;
