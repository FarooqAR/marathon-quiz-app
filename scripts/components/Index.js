import React, {Component} from 'react';
import {Link} from 'react-router';
export default class Index extends Component{
    render(){
        return (
            <div>
            <Link to="/signin">Sign In</Link>
            </div>
        );
    }
}