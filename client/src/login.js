import React from 'react';
import axios from './axios';
import ErrorMsg from './error';
import { Link } from 'react-router-dom';

// function ErrorMsg {
//         return <p>check your info and type again</p>;
//     }

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
            email: '',
            password: '',
            loggedIn: null
        };
    }

    handleClick() {
        console.log('clicked');
        axios
            .post('/login', this.state)
            .then(result => {
                console.log(result);
                if (result.data.success == true) {
                    location.replace('/');
                } else {
                    this.setState({ error: true });
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({ error: true });
            });
    }

    handleChange(e) {
        console.log(e.target.name);
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state);
    }

    render() {
        return (
            <div className = 'welcome__form'>
                {this.state.error && <ErrorMsg />} 

                <input name="email" type="email" placeholder="email" onChange={e => this.handleChange(e)} />

                <input name="password" type="password" placeholder="password" onChange={e => this.handleChange(e)} />
                <input type="submit" onClick={() => this.handleClick()} value="submit" />

                <Link to="/verification">Find back password</Link>
                <Link to="/">Signup</Link>
            </div>
        );
    }
}
