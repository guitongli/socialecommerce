import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Signup from './signup';
import Login from './login';
import Reset from './reset';
import Verification from './verification';  
import Logout from './logout';


export default function Welcome() {

    return (
        <div className='welcome'>
            <h1 className ='welcome__title'>Welcome</h1>

            <HashRouter>
                <div className = 'light'>
                    <Route exact path='/' component ={Signup} />
                    <Route path='/login' component={Login} />
                    <Route path='/reset' component={Reset} /> 
                    <Route path='/verification' component={Verification} />
                  
 
                </div>
            </HashRouter>
            
        </div>
    );
}