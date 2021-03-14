import React from 'react';
import axios from './axios';
import ErrorMsg from './error';
import { Link } from 'react-router-dom';
import Verification from './verification';

// function ErrorMsg {
//         return <p>check your info and type again</p>;
//     }

export default class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            error: false,
            step: 1
        };
    }

    async handleClick(e) {
        console.log(e);
        const signupresult = await axios.post('/signup', this.state);

        console.log(signupresult);
        if (signupresult.data.success) {
            const checksent = await axios.post('/verification/sendemail', this.state);
            if (checksent.data.success) {
                this.setState({ step: 2 });
                this.setState({
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: ''
                });
            } else {
                this.setState({ error: true });
            }
        } else {
            this.setState({ error: true });
        }
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
            <div>
                <h1> to the antisocial network.</h1>
                {this.state.error && <ErrorMsg />}
                <input name="username" type="text" placeholder="unique username" onChange={e => this.handleChange(e)} />
                <input name="yourname" type="text" placeholder="your name" onChange={e => this.handleChange(e)} />
                <input name="email" type="email" placeholder="email" onChange={e => this.handleChange(e)} />

                <input name="password" type="password" placeholder="password" onChange={e => this.handleChange(e)} />
                <button onClick={e => this.handleClick()} value="submit">
                    hihi
                </button>

                <Link to="/login">Click here to Log in!</Link>
                {this.state.step == 2 && <Verification email={this.state.email} />}
            </div>
        );
    }
}
