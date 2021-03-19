import axios from "axios";
import { useState, useEffect } from "react";

export default function Search() {
    const [searchTerm, setSearchTerm] = useState();
    const [users, setUsers] = useState();
    

    function handleClick() {
        axios.get("/search/recent").then((result) => {
            console.log("recent", result);
            setUsers(result.data);
        });
    }

    function setListInvisible (){
        setUsers(null);
    }

    useEffect(
        function () {
            axios.get(`/search/search/${searchTerm}`).then((result) => {
                console.log("searched", result);
                setUsers(result.data);
            });
        },
        [searchTerm]
    );
     
    

    return (
        <>
            <input
                onClick={handleClick}
                onBlur={setListInvisible}
                className="search__input"
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    console.log("what did you write", e.target.value);
                }}
                placeholder="search"
            ></input> 
            <div className = 'search__list'>
                {users &&
                    users.map(function (user) {
                        return (
                            <div className="search__list-item" key={user.id}>
                                {user.username} <p>{user.yourname}</p>{" "}
                                <img
                                    className="search__list-item__img"
                                    src={user.pic}
                                ></img>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}
