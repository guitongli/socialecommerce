import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import axios from "./axios";
import { getMyItems } from "./actions";

export default function MyItems() {
    const dispatch = useDispatch();
    const { my_items } = useSelector((state) => {
        return state;
    });
    useEffect(() => {
        dispatch(getMyItems());
        console.log("getting item");
    }, []);

    return (
        <div className="my-items">
            <div className="my-items__list">
                {my_items &&
                    my_items.map(function (my_item) {
                        return (
                            <div className="my-item" key={my_item.id}>
                                
                                <img
                                    onClick={() => {
                                        location.replace(
                                            `/marketplace/${my_item.id}`
                                        );
                                    }}
                                    src={my_item.item_pic}
                                />

                                <h1> {my_item.item_name}</h1>

                                {my_item.item_des}
                                <h2>{my_item.item_price},- EUR</h2>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
