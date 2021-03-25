// import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Signup from "./signup";
import Login from "./login";
import Reset from "./reset";
import Verification from "./verification";
// import Logout from "./logout";

export default function Welcome() {
    return (
        <div className="welcome">
            <img src="https://images.unsplash.com/photo-1510782977572-76493a0a7f57?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"></img>
            <div className="welcome__overlay">
                <div className="welcome__headline">
                  <h1>  <i className="fab fa-cuttlefish"></i></h1>
                    <h4> Bereit, deinen Kleiderschrank auszusortieren?</h4>
                </div>
                <HashRouter>
                    <div className="welcome__form">
                        <Route exact path="/" component={Signup} />
                        <Route path="/login" component={Login} />
                        <Route path="/reset" component={Reset} />
                        <Route path="/verification" component={Verification} />
                    </div>
                </HashRouter>
            </div>
            {/* <div><h1>Platform for swapping and sharing</h1></div> */}
        </div>
    );
}
