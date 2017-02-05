import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import {Link} from 'react-router';

export default class extends Component {
    render() {
        let quizzes = JSON.parse(localStorage.quizzes);
        return (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Created By</th>
                            <th>Time (in minutes)</th>
                        </tr>
                    </thead>
                    <tbody>
                    {quizzes && quizzes.map((quiz, id) => {
                        return (
                            <tr key={id}>
                                <td><Link to={"/quiz/" + id}>{quiz.name}</Link></td>
                                <td>{quiz.createdBy}</td>
                                <td>{quiz.time}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>

            </div>
        );
    }
}