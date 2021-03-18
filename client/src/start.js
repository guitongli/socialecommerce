import ReactDOM from "react-dom";
import Welcome from "./welcome";
import {Provider} from "react-redux"
import App from "./app";

const store

let elem;
if (location.pathname === '/welcome'){
    elem = < Welcome />;
} else {

    elem = 
    <Provider>< App /></Provider>;
}
ReactDOM.render(elem, document.querySelector("main"));
