import { useEffect } from "react";
// import { socket } from "./sockets";
import { useSelector, useDispatch } from "react-redux";
// import { getRelations } from "./actions";
import { Link } from "react-router-dom";

export default function Alert() {
    const dispatch = useDispatch();
    const newMessage = useSelector((state) => {
        return state.new_message;
    });
    const newRequest = useSelector((state) => {
        return state.new_request;
    });

    // const elemRef = useRef();
    function reset() {
        document.getElementsByClassName("alert-message")[0].style.display =
            "none";
        document.getElementsByClassName("alert-request")[0].style.display =
            "none";
    }
    useEffect(() => {
        console.log("test new request");
        document.getElementsByClassName("alert-request")[0].style.display =
            "block";
        document.getElementsByClassName("alert-message")[0].style.display =
            "none";
    }, [newRequest]);
    useEffect(() => {
        console.log("test new message");
        document.getElementsByClassName("alert-message")[0].style.display =
            "block";
        document.getElementsByClassName("alert-request")[0].style.display =
            "none";
    }, [newMessage]);

    return (
        <div className="alert">
            <button
                onClick={() => {
                    location.replace("/friends");
                }}
            >
                Friends
            </button>
            <div className="alert-request">
                <h6>
                    {newRequest &&
                        `${newRequest.username} has a new request for you`}
                </h6>

                {newRequest && (
                    <Link
                        to={{
                            pathname: `/user/${newRequest.sender_id}`,
                        }}
                    >
                        <img
                            onClick={reset}
                            className="small-picture"
                            src={newRequest.pic}
                        />
                    </Link>
                )}
            </div>
            <div className="alert-message">
                <h6>
                    {newMessage &&
                        `${newMessage.username} has a new message for you`}
                </h6>
                {newMessage && (
                    <Link
                        to={{
                            pathname: `/user/${newMessage.sender_id}`,
                        }}
                    >
                        <img
                            onClick={reset}
                            className="small-picture"
                            src={newMessage.pic}
                        />
                    </Link>
                )}
            </div>
        </div>
    );
}
