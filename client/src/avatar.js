// import { Link, BrowserRouter } from "react-router-dom";
// import {useEffect, useState} from 'react';
export default function Avatar(props) {

    console.log(props);
 
    return (
        <div className='avatar'>
           
            
           
            <h1>{props.username}</h1>
            <img onClick={props.handleImgClick} src={props.profilepic}></img>
        </div>
    );
}
