import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Signup from './signup';
import Login from './login';
import Reset from './reset';
import Verification from './verification';  


export default function Welcome() {

  return (
        <div id='welcome'>
            <h1>Welcome</h1>

            <HashRouter>
                <div>
                    <Route exact path='/' component ={Signup} />
                    <Route path='/login' component={Login} />
                    <Route path='/reset' component={Reset} /> 
                    <Route path='/verification' component={Verification} />
 
                </div>
            </HashRouter>
            
        </div>
    );
}