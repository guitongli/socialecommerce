import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Search() {
    const [searchTerm, setSearchTerm] = useState();
    const [users, setUsers] = useState();

    useEffect(function () {
        axios.get('/search/recent').then(
            (result) => { console.log('recent', result); setUsers(result.data); });
    }, []);

    useEffect(function () {
        axios.get(`/search/search/${searchTerm}`).then(
            (result) => { console.log('searched', result); setUsers(result.data);});
    }, [searchTerm]);

    return (
        <>
            <input onChange={e => { setSearchTerm(e.target.value); 
            console.log('what did you write', e.target.value);
            }} placeholder={searchTerm}></input>

            {
                users && users.map(function (user) {
                    return (<div key = {user.id}>
                        {user.username}  <p>{user.yourname}</p> <img src = {user.pic}></img>
                    </div >);
                })}
        </>
    );
}




