import React, {Component} from 'react';
import {Panel, InputGroup, FormGroup, FormControl} from 'react-bootstrap';
import CreateOptionsList from './CreateOptionsList';

export default class CreateQuestionsList extends Component {
    render() {
        return (
            <div>
            {this.props.questions.map((question, idx) => {

                    return (
                        <Panel key={idx} header={"Question " + (idx + 1)} bsStyle="info">
                            <h3>{question.text}</h3>
                            <hr/>
                            <label>
                                <input
                                    type="checkbox"
                                    name="question_check"
                                    className=""
                                    checked={question.multichoice}
                                    disabled/>
                                &nbsp;Multichoice
                            </label>

                            <CreateOptionsList
                                options={question.answers}
                                multichoice={question.multichoice}
                                noDeleteBtn="true"/>

                        </Panel>
                    );
                })}

            </div>
        );
    }
}