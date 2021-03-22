import ReactDOM from "react-dom";
import Welcome from "./welcome";
import { Provider } from "react-redux";
import App from "./app";
import { composeWithDevTools } from "redux-devtools-extension";

import { createStore, applyMiddleware } from "redux";
import Reducer from "./reducer";
import reduxPromise from "redux-promise";
import {init} from './sockets';
const store = createStore(Reducer, composeWithDevTools(applyMiddleware(reduxPromise)));


let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    init(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}
ReactDOM.render(elem, document.querySelector("main"));
