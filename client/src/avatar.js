import { Link, BrowserRouter } from "react-router-dom";
// import {useEffect, useState} from 'react';
export default function Avatar(props) {
   

    return (
        <div className="avatar">
            <Link to='/profile'>
            <img src={props.profilepic}></img></Link>
        </div>
    );
}
