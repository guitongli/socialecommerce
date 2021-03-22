// import { useEffect } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "./axios";
import { updateItemPic, updatePicLink, updateItemInfo } from "./actions";

export default function ItemUpload() {
    const dispatch = useDispatch();
    const { item_name, item_des, item_price, pic_link, pic_file } = useSelector(
        (state) => {
            return state;
        }
    );

    async function uploadItem() {
        console.log(
            "state items",
            item_name,
            item_des,
            item_price,

            pic_file
        );

        var formData = new FormData();

        formData.append("file", pic_file);
        // formData.append('description', this.description);
        formData.append("item_name", item_name);
        formData.append("item_des", item_des);
        formData.append("item_price", item_price);

        const { data } = await axios.post("/save/upload/item", formData);

        dispatch(updatePicLink(data.link));
        location.replace("/");
    }

    return (
        <div className="item-uploader">
            {/* {this.state.error && <ErrorMsg />} */}

            {/* <img src={this.state.pic} /> */}
            <input
                type="file"
                name="file"
                accept="image/*"
                onChange={(e) => {
                    dispatch(updateItemPic(e.target.files[0]));
                }}
            />
            <input
                type="text"
                name="item_name"
                placeholder="article title"
                onChange={(e) => {
                    dispatch(updateItemInfo(e.target.name, e.target.value));
                }}
            />
            <input
                type="text"
                name="item_des"
                placeholder="description"
                onChange={(e) => {
                    dispatch(updateItemInfo(e.target.name, e.target.value));
                }}
            />
            <input
                type="number"
                name="item_price"
                placeholder="price"
                onChange={(e) => {
                    dispatch(updateItemInfo(e.target.name, e.target.value));
                }}
            />
            <img src={pic_link}></img>
            <button onClick={uploadItem}>publish</button>
        </div>
    );
}
