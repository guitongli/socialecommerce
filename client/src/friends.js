import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getFriends,
    getRequests,
    acceptRequest,
    deleteRelation,
} from "./actions";

export default function Friends() {
    const dispatch = useDispatch();
    const friends = useSelector((state) =>
        state.visitors.filter((visitor) => visitor.accepted == true)
    );
    const requests = useSelector((state) =>
        state.visitors.filter((visitor) => visitor.accepted == false)
    );

    useEffect(() => {
        dispatch(getFriends());
        dispatch(getRequests());
        
    }, []);

    if (!friends && !requests) {
        return null;
    }
    return (
        <div className="friends and requests">
            <div className="friends">
                {friends &&
                    friends.map(function (friend) {
                        return (
                            <div className="friends__item" key={friend.id}>
                                {friend.username} <p>{friend.yourname}</p>
                                <img
                                    className="friends__item__img"
                                    src={friend.pic}
                                />
                                <button onClick ={
                                    ()=> dispatch(deleteRelation(friend.id))
                                }>delete</button>
                            </div>
                        );
                    })}
            </div>
            <div className="requests">
                <h1>People waiting</h1>
                {requests &&
                    requests.map(function (request) {
                        return (
                            <div className="requests__item" key={request.id}>
                                {request.username} <p>{request.yourname}</p>
                                <img
                                    className="requests__item__img"
                                    src={request.pic}
                                />
                                <button onClick ={
                                    ()=> dispatch(acceptRequest(request.id))
                                }>accept</button>
                                <button onClick ={
                                    ()=> dispatch(deleteRelation(request.id))
                                }>delete</button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
