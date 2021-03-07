import React from 'react';
import axios from 'axios';

export default class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
            firstname: '',
            lastname: '',
            email: '',
            password:'',

        };
    }

    handleClick(e) {
         e. preventDefault();
        console.log(this.state);
        axios.post('/signup', this.state).then((result)=>{console.log(result); location.reqplace('/');}).catch((err)=>{console.log(err)});

    }

    handleChange(e) {
        console.log(e.target.name);
        this.setState({
            [e.target.name]:e.target.value
            }
            
        );
        console.log(this.state);
    }
    render() {
        return (
            <div>
                <h1> to the antisocial network.</h1>
                <form id="signup" method = 'post' action = '/signup' >
                    <input name = 'firstname' type="text" placeholder="firstname" onChange={e => this.handleChange(e)} />
                    <input name = 'lastname' type="text" placeholder="lastname" onChange={e => this.handleChange(e)} />
                    <input name = 'email' type="email" placeholder="email" onChange={e => this.handleChange(e)} />

                    <input name = 'password' type="password" placeholder="password" onChange={e => this.handleChange(e)} />
                    <input type = 'submit' onClick={e => this.handleClick()} value ='submit'/>
                </form>
            </div>
        );
    }
}
