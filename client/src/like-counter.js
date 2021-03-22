import { useState, useEffect } from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
// import axios from "./axios";
import { getItemInfo } from "./actions";
import LikeCounter from "./like-counter";

export default function ItemViewer(props) {
    const currentItemId = props.match.params.id;
    const dispatch = useDispatch();
    const { item_name, item_des, item_pic, item_price } = useSelector(
        (state) => {
            return state.current_item_info;
        }
    );
    useEffect(function () {
        dispatch(getItemInfo(currentItemId));
    });

    function clickBuy() {}
    function handleRedirect() {}
    return (
        <div className="like-counter">
            <h5>{likeCount}</h5>
            <div className="heart-wrapper" onClick={handleLike(e)}>
                <i className="material-icons not-liked bouncy">
                    favorite_border
                </i>
                <i className="material-icons is-liked bouncy">favorite</i>
            </div>
            ;
        </div>
    );
}
