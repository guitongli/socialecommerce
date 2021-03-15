import { Link, BrowserRouter } from 'react-router-dom';

export default function Avatar(props) {
    console.log(props);
    return (

        <>

            <BrowserRouter>
                <Link to='/logout'>logout</Link>
                <img className='search-button' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/768px-Search_Icon.svg.png' onClick={props.handleSearchToggle}></img>
                <h1>{props.username}</h1>
                <img onClick={props.handleImgClick} src={props.profilepic}></img>
            </BrowserRouter>
        </>
    );
}