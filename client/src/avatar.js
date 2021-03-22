// import { Link, BrowserRouter } from "react-router-dom";
// import {useEffect, useState} from 'react';
export default function Avatar(props) {
    console.log(props);

    return (
        <div className="avatar">
            <img onClick={props.handleImgClick} src={props.profilepic}></img>
        </div>
    );
}
