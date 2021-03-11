import React from 'react';
import axios from './axios';

export default class Verification extends React.Component {
    constructor(props){
        super(props);
        this.state={
            code:"",

        };
    }

    codeCheck(e){
        console.log(e.target.value);
        this.setState({code: e.target.value});
        axios.post('/reset', this.state).then((result)=>console.log(result)).catch(err => console.log(err));
    }
    render (){
        return <div>
            <h1>An email is on your way. Put in below the code you receive</h1>
            <input type = 'text' placeholder = '6-digit code' name ='code' onChange ={e=> this.codeCheck()}></input>
        </div>
    }
}