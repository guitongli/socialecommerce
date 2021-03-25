import { useEffect } from "react";
// import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
// import axios from "./axios";
// import { Link } from "react-router-dom";

import { getUpdates } from "./actions";
import FriendButton from "./friend-button";
// import LikeCounter from "./like-counter";

export default function Updates() {
    const dispatch = useDispatch();
    const updates = useSelector((state) => {
        return state && state.updates;
    });

    useEffect(function () {
        dispatch(getUpdates());
    }, []);
    // {id, item_des, item_name, item_pic, item_price, seller_id}

    // function clickBuy() {}

    return (
        <div className="updates">
            {updates &&
                updates.map((update) => {
                    return (
                        <div className="updates__item" key={update.item_id}>
                            <div className="updates__item__relation">
                                <div>
                                    <img
                                        className="small-picture"
                                        src={update.pic}
                                        onClick={() => {
                                            location.replace(
                                                `/user/${update.seller_id}`
                                            );
                                        }}
                                    />
                                    {update.username} {update.yourname}
                                </div>
                                <div>
                                    <FriendButton hisId={update.seller_id} />
                                </div>
                            </div>
                            <div
                                onClick={() => {
                                    location.replace(
                                        `/marketplace/${update.item_id}`
                                    );
                                }}
                            >
                                <img
                                    className="middle-item-pic"
                                    src={update.item_pic}
                                />
                            </div>
                            <div className="updates__item__des">
                                {update.item_name} <p>Price:</p>
                                {update.item_price} ,- Eur
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
