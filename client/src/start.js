import ReactDOM from "react-dom";
import Welcome from "./welcome";
import { Provider } from "react-redux";
import App from "./app";

import { createStore, applyMiddleware } from "redux";
import { reducer } from "./reducer";
import reduxPromise from "redux-promise";

const store = createStore(reducer, applyMiddleware(reduxPromise));

let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = (
        <Provider store={store}>
            <App />
       </Provider> 
    );
}
ReactDOM.render(elem, document.querySelector("main"));
