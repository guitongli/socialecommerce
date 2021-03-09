import React from 'react';
import instance from './axios';
import ErrorMsg from './error';
import { Link, Router} from 'react-router-dom';

// function ErrorMsg {
//         return <p>check your info and type again</p>;
//     }

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            error: false,
            email: '',
            password:'',

        };
    }

    handleClick(e) { 
     
        instance.post('/login', {name : true}).then((result)=>{console.log(result); location.reqplace('/');}).catch((err)=>{console.log(err); this.setState({error: true})});

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
        const toggle = this.state.error;
        return (
            <div>
                < ErrorMsg  error = {toggle} />
                <h1> to the antisocial network.</h1>
               
                <form id="signup" method = 'post' action = '/login' >
                  <input name = 'email' type="email" placeholder="email" onChange={e => this.handleChange(e)} />

                    <input name = 'password' type="password" placeholder="password" onChange={e => this.handleChange(e)} />
                    <input type = 'submit' onClick={e => this.handleClick()} value ='submit'/>
                </form>
                <Link to="/reset">Click here to find back password!</Link>
            </div>
        );
    }
}
