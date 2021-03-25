import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Search() {
    const [searchTerm, setSearchTerm] = useState();
    const [users, setUsers] = useState();
    function handleClick() {
        axios.get("/search/recent").then((result) => {
            console.log("recent", result);
            setUsers(result.data);
            document.querySelector(".search__list").style.visibility =
                "visible";
        });
    }

    function setListInvisible() {
        document.querySelector(".search__list").style.visibility = "hidden";
    }
    useEffect(function () {
        setListInvisible();
    }, []);
    useEffect(
        function () {
            if (searchTerm) {
                axios.get(`/search/search/${searchTerm}`).then((result) => {
                    console.log("searched", result);
                    setUsers(result.data);
                });
            }
        },
        [searchTerm]
    );

    return (
        <div className="search">
            <div className="search__input">
                <input
                    onClick={handleClick}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        console.log("what did you write", e.target.value);
                    }}
                    placeholder="search"
                ></input>
            </div>
            <div className="search__list">
                <h1 onClick={setListInvisible}>x</h1>
                <div className="search__list__wrapper">
                    {users &&
                        users.map(function (user) {
                            return (
                                <div className="search__list-item"
                                    to={{ pathname: `/user/${user.id}` }}
                                    key={user.id} onClick ={setListInvisible}>
                                    <Link>
                                        
                                        <img
                                            className="middle-picture"
                                            src={user.pic}
                                        ></img> 
                                    </Link>
                                    <h6>
                                        
                                        {user.username}
                                        {user.yourname}
                                    </h6>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
