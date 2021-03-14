import {Link} from 'react-router-dom';

export default function Avatar (props){
    console.log(props);
    return (
        
        <>
        <Link to='/logout'>logout</Link>
        <h1>{props.username}</h1>
        <img onClick = {props.handleImgClick} src = {props.profilepic}></img>
        </>
    );
}