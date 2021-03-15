import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Search() {
    const [searchTerm, setSearchTerm] = useState();
    const [users, setUsers] = useState();

    useEffect(function () {
        axios.get('/search/recent').then(
            (result) => { console.log('recent', result); setUsers(result.data) });
    }, []);
    useEffect(function () {
        axios.get(`/search/recent/${searchTerm}`).then(
            (result) => { console.log('searched', result); });
    }, [searchTerm]);

    return (
        <>
            <input onChange={e => { setSearchTerm(e.target.value) }} placeholder={searchTerm}></input>

            {
                users && result.map(function(user){
                    return(<div>
                    {user.username}  <p>{user.yourname}</p>
                 </div >)
                })}
        </>
    );
}
   


}
