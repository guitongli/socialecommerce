import React from 'react';
import axios from './axios';
import ErrorMsg from './error';
import { Link, Router } from 'react-router-dom';

// function ErrorMsg {
//         return <p>check your info and type again</p>;
//     }

export default class Logout extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
            email: '',
            password: '',
            loggedIn: null
        };
    }

    async handleClick() {
        const result = await axios.get('/unlog');

        console.log('i did log out', result);
        
        location.replace('/welcome');
    }

    render() {
        return (
            <div onClick={this.handleClick} className='logout'> 

                {/* <h6> do you really want to go? we will miss you.</h6> */}
                 Logout
            </div>
        );
    }
}
