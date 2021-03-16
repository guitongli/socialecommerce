import React from 'react';
import axios from './axios';
import ErrorMsg from './error';
import { Link, Router } from 'react-router-dom';

// function ErrorMsg {
//         return <p>check your info and type again</p>;
//     }

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            email: '',
            password: '',
            loggedIn: null
        };
    }

    async componentDidMount() {
        const result = await axios.get('/unlog', this.state);

        console.log('i did log out', result);
        if (result.data.success == true) {
            this.setState({ error: false });
        } else {
            this.setState({ error: true });
        }
    }

    render() {
        return (
            <div> 
                <h1> we will miss you.</h1>
               
                    <Link to="/welcome">Click here to login!</Link>
                 
            </div>
        );
    }
}
