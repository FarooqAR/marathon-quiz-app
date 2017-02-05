import React, {Component} from 'react'
import QuizList from './QuizList';

export default class Quizzes extends Component{
    render(){
        return (
            <div>
                <h2 className="centeredText">Quizzes</h2>
                <QuizList />
            </div> 
        );
    }
}