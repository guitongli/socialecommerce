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
                    New Message from
                    {newMessage && newMessage.username}
                </h6>
                {/* {requests && (
                    <Link
                        to={{
                            pathname: `/user/${
                                requests[requests.length - 1].id
                            }`,
                        }}
                    >
                        <img
                            onClick={reset}
                            className="small-picture"
                            src={requests[requests.length - 1].pic}
                        />
                    </Link>
                )} */}
                {/* </div>
            <div
                className="alert-null"
                onClick={() => {
                    location.replace("/friends");
                }}
            >
                <h1>Friends</h1>
            </div> */}
                {/* { privateMessages && <NewMessages pic={privateMessages[privateMessages.length - 1].pic }username={privateMessages[privateMessages.length - 1].username}/> } */}
            </div>
        </div>
    );
}
