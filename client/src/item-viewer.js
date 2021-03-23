import { useState, useEffect } from "react";
import axios from "./axios";
import { useDispatch, useSelector } from "react-redux";
// import axios from "./axios";
import { Link } from "react-router-dom";

import { getItemInfo } from "./actions";
import LikeCounter from "./like-counter";

export default function ItemViewer(props) {
    const currentItemId = props.match.params.id;
    const dispatch = useDispatch();
    const data = useSelector((state) => {
        return (state &&state.current_item_info);
    });
    
    console.log(data)
    useEffect(function () {
        dispatch(getItemInfo(currentItemId));
    },[]);
// {id, item_des, item_name, item_pic, item_price, seller_id}
    
    // function clickBuy() {}
    
    return (
        <div className="item-viewer">
             
            <p> {data&& data.item_name}</p>

            <img className='item-viewer__img' src={data&& data.item_pic} />
            {/* <LikeCounter id={data&& data.id} /> */}
            <div>
                {data&& data.item_des}
                <p>{data&& data.item_price},- EUR</p>
            </div>
            {/* <button onClick={clickBuy}>express counter</button> */}
            {data&& <Link to={"/user/" + data.seller_id}>X</Link>}
        </div>
    );
}
