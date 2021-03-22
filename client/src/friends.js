import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getRelations, acceptRequest, deleteRelation } from "./actions";

export default function Friends() {
    const dispatch = useDispatch();
    const friends = useSelector((state) => {
        return (
            state.relations &&
            state.relations.filter((relation) => {
                return relation.accepted == true;
            })
        );
    });

    const requests = useSelector((state) => {
        return (
            state.relations &&
            state.relations.filter((relation) => !relation.accepted)
        );
    });

    useEffect(() => {
        dispatch(getRelations());
    }, []);
 

    return (
        <div className="relations">
            <div className="friends">
                {friends &&
                    friends.map(function (friend) {
                        return (
                            <div className="friends__item" key={friend.id}>
                                <Link to={{ pathname: `/user/${friend.id}` }}>
                                    {friend.username} <p>{friend.yourname}</p>
                                    <img
                                        className="friends__item__img"
                                        src={friend.pic}
                                    />
                                </Link>
                                <button
                                    onClick={() =>
                                        dispatch(deleteRelation(friend.id))
                                    }
                                >
                                    delete
                                </button>
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
                                <button
                                    onClick={() =>
                                        dispatch(acceptRequest(request.id))
                                    }
                                >
                                    accept
                                </button>
                                <button
                                    onClick={() =>
                                        dispatch(deleteRelation(request.id))
                                    }
                                >
                                    delete
                                </button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
