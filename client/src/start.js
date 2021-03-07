import ReactDOM from "react-dom";
import Welcome from "./welcome";


let elem;
if (location.pathname === '/welcome'){
    elem = < Welcome />;
} else {
    elem = <p>main page should show up later</p>;
}
ReactDOM.render(elem, document.querySelector("main"));
