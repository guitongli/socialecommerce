import React from 'react';
import axios from './axios';
import ProfilePic from './profile-pic'; 



export default class Signup extends React.Component {
    constructor() {
        super();
        this.state = { 
            firstname: '',
            lastname: '',
            email: '',
            profilepic: 'https://d33epyjwhmr3r5.cloudfront.net/cms/images/sandbox/madhuontap.svg', 
            bio:''
            error: false,
            uploaderToggle:false
    
        };
    }

    componentDidMount(){
        axios.get('/user').then(result => console.log(result))
    }
  
    handleClick(e) {
        
        console.log(e);
        axios
            .post('/signup', this.state)
            .then(result => {
                console.log(result);
                location.replace('/');
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
            <div>
            
                <h1> to the antisocial network.</h1>
                {this.state.error && <ErrorMsg/>}
                <input name="firstname" type="text" placeholder="firstname" onChange={e => this.handleChange(e)} />
                <input name="lastname" type="text" placeholder="lastname" onChange={e => this.handleChange(e)} />
                <input name="email" type="email" placeholder="email" onChange={e => this.handleChange(e)} />

                <input name="password" type="password" placeholder="password" onChange={e => this.handleChange(e)} />
                <button onClick={e => this.handleClick()} value="submit">
                    hihi
                </button>

                <Link to="/login">Click here to Log in!</Link>
            </div>
        );
    }
}
