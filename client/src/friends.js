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
            state.relations.filter((relation) => relation.accepted == false)
        );
    });

    useEffect(() => {
        dispatch(getRelations());
    }, []);

    return (
        <div className="relations">
            <h1>Friends</h1>
            <div className="friends">
                {friends &&
                    friends.map(function (friend) {
                        return (
                            <div className="friends__item" key={friend.id}>
                                <h3>
                                    {friend.username} {friend.yourname}
                                </h3>
                                <Link
                                    to={{ pathname: `/user/${friend.user_id}` }}
                                >
                                    <img
                                        className="friends__item__img"
                                        src={friend.pic}
                                    />
                                </Link>
                                <div>
                                    <button
                                        onClick={() =>
                                            dispatch(
                                                deleteRelation(friend.user_id)
                                            )
                                        }
                                    >
                                        delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <div>
                <h1>People waiting</h1>
            </div>
            <div className="requests">
                {requests &&
                    requests.map(function (request) {
                        return (
                            <div className="requests__item" key={request.id}>
                                <h3>
                                    {" "}
                                    {request.username} {request.yourname}
                                </h3>
                                <img
                                    className="requests__item__img"
                                    src={request.pic}
                                />
                                <div>
                                    <button
                                        onClick={() =>
                                            dispatch(
                                                acceptRequest(request.sender_id)
                                            )
                                        }
                                    >
                                        accept
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={() =>
                                            dispatch(
                                                deleteRelation(
                                                    request.sender_id
                                                )
                                            )
                                        }
                                    >
                                        delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
