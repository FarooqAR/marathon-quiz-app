import React, {Component} from 'react';
import {browserHistory} from 'react-router';

export default class SignIn extends Component{
    signIn(e){
        e.preventDefault();
        let user = {};
        user.name = this.username.value;
        user.pass = this.password.value;
        let users = localStorage.users;
        if(users){
            users = JSON.parse(localStorage.users);
            users.push(user);
        }
        else{
            users = [];
            users.push(user);
        }
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(user));
        browserHistory.push('/create');
    }
    render(){
        return (
            <div>
                <h2 className="centeredText">Sign In | Sign Up</h2>
            <form onSubmit={(e)=>this.signIn(e)}>
                <input type="text" placeholder="Username" ref={input => this.username = input} className="form-control" required/>
                <input type="password" placeholder="Password" ref={input => this.password = input} className="form-control" required/>
                <input type="submit" className="btn btn-default" value="sign in"/>
            </form>
            </div>
            
        );
    }
}