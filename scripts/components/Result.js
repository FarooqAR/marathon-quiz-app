import React, {Component} from 'react'
export default class Result extends Component{
    render(){
        return (
            <div>
                <h2>You got {this.props.perc}%</h2>
            </div>
        );
    }
}