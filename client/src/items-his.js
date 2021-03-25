import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import axios from "./axios";
import { getHisItems, updateClickedItem } from "./actions";

export default function HisItems(props) {
    const dispatch = useDispatch();
    const { his_items } = useSelector((state) => {
        return state;
    });
    useEffect(() => {
        dispatch(getHisItems(props.hisId));
        console.log("getting item");
    }, []);

    return (
        <div className="his-items">
            <div className="his-items__list ">
                {his_items &&
                    his_items.map(function (his_item) {
                        return (
                            <div
                                className="his-items"
                                key={his_item.id}
                                onClick={() => {
                                    location.replace(`/marketplace/${his_item.id}`);
                                }}
                            >
                                <img className="updates__item__big-pic" src={his_item.item_pic} />
                                <div>
                                    <h2> {his_item.item_name}</h2>

                                    {his_item.item_des}
                                    <p>{his_item.item_price},- EUR</p>
                                </div> 
                                
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
