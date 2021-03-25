// import { useEffect, useState } from "react";
// import { socket } from "./sockets";
import { useSelector, useDispatch } from "react-redux";
// import { getRelations } from "./actions";
// import { Link } from "react-router-dom";

export default function Alert() {
    const dispatch = useDispatch();
    const newMessage = useSelector((state) => {
        return state.new_message;
    });
    const newRequest = useSelector((state) => {
        return state.new_request;
    });

    // const elemRef = useRef();

    return (
        <div className="alert">
            <div className="alert-request" >
                <h6>
                    New Request from
                    {newRequest && newRequest.username}
                </h6>
                <h6>
                    New Request from
                    {newMessage && newMessage.username}
                </h6>
                 
                 
            </div>
        </div>
    );
}
