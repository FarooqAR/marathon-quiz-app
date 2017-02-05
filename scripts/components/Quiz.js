import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Quiz extends Component{
    constructor(props){
        super(props);
        this.state = {start: false};
    }
    render(){
        let quizzes = JSON.parse(localStorage.quizzes);
        let quiz = quizzes[this.props.params.id];
        return (
            <div>
                <h2 className="centeredText">Quiz Screen</h2>
                {quiz && 
                <div>
                    <div><strong>Name: </strong>{quiz.name}</div>
                    <div><strong>Created By: </strong>{quiz.createdBy}</div>
                    <div><strong>Time Allowed: </strong>{quiz.time}</div>
                </div>
                }
                <Link to={"/start/" + this.props.params.id}>
                    Start Quiz
                </Link>
            </div>
        );
    }
}