import React from 'react';
import axios from './axios';
import ErrorMsg from './error.js';
import {Link} from 'react-router-dom';

export default class Verification extends React.Component {
    constructor() {
        super();
        this.state = {
            code: '',
            email: '',
            step: 1,
            password: '',
            password2: ''
        };
    }
    componentDidMount(){
        if(this.props){
            const passedemail= this.props.email;
            this.setState({step: 2, email:passedemail});
            if (this.state.step ==3){
                this.setState({step: 4});
            }
            
        }
    }
    sendCode() {
        axios
            .post('/verification/sendemail', this.state.email)
            .then(result => {
                if (result.data.success) {
                    this.setState({ step: 2 });
                }
            })
            .catch(err => console.log(err));
    }
    codeCheck() {
        axios
            .post('/verification', this.state)
            .then(result => {
                if (result.data.success) {
                    if(this.props){this.setState({ step: 4});}
                    else{this.setState({ step: 3 });}
                }
            })
            .catch(err => console.log(err));
    }
    updatePassword() {
        if (this.state.password == this.state.password2) {
            axios.post('/verification/updatepassword', this.state).then(result => {
                if (result.data.success) {
                    this.setState({ step: 4 });
                }
            });
        }
    }
    handleChange(e) {
        console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        if (this.state.step == 1) {
            return (
                <div className = 'welcome__form'>
                    {this.state.error && <ErrorMsg />}
                     
                    <h2>please tell us your email so that we can send a secret code to you</h2>
                    <input name="email" type="email" placeholder="email" onChange={e => this.handleChange(e)} />
                    <button onClick={() => this.sendCode()}>send me a code</button>
                </div>
            );
        } else if (this.state.step == 2) {
            return (
                <div className = 'welcome__form'>
                    <h2>An email is on your way. Put in below the code you receive</h2>
                    <input type="text" placeholder="6-digit code" name="code" onChange={e => this.handleChange(e)} />
                    <button onClick={() => this.codeCheck()}>confirm</button>
                </div>
            );
        } else if (this.state.step == 3) {
            return (
                <div className = 'welcome__form'>
                    <h2>Please decide a new password</h2>
                    <input type="password" placeholder="password" name="password" onChange={e => this.handleChange(e)} />
                    <input
                        type="password"
                        placeholder="repeat password"
                        name="password2"
                        onChange={e => this.handleChange(e)}
                    />
                    <button onClick={() => this.updatePassword()}>update</button>
                </div>
            );
        } else if (this.state.step == 4) {
            return (
                <div className = 'welcome__form'>
                    <h1>congrats! now </h1>
                    <Link to="/login">Click here to Log in!</Link>
                </div>
            );
        }
    }
}
