import React, {Component} from 'react';
import {Panel, InputGroup, FormGroup, FormControl} from 'react-bootstrap';
import CreateOptionsList from './CreateOptionsList';
import CreateQuestionsList from './CreateQuestionsList';

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 1,
            name: '',
            description: '',
            time: '',
            currentOptionText: '',
            currentQuestionText: '',
            isCurrentQuestionMultiChoice: false,
            questions: [],
            currentOptions: []
        };
        this.deleteOption = this.deleteOption.bind(this);
        
    }
    createQuiz(e) {
        e.preventDefault();
        if(this.state.name !== "" && this.state.description !== "" && this.state.time !== "" && this.state.questions.length > 0){
            
            let quiz = {};
            quiz.createdBy = "farooq";
            quiz.name = this.state.name;
            quiz.description = this.state.description;
            quiz.time = this.state.time;
            quiz.questions = this.state.questions;
            let quizzes = [];
            if(localStorage.quizzes){
                quizzes = JSON.parse(localStorage.quizzes);
                quizzes.push(quiz);
            }
            else{
                quizzes.push(quiz);
            }
            localStorage.setItem("quizzes", JSON.stringify(quizzes));
        }
    }
    onQuizNameChange(e) {
        this.setState({name: e.target.value})
    }
    onQuizDescChange(e) {
        this.setState({description: e.target.value})
    }
    onQuizTimeChange(e) {
        this.setState({time: e.target.value});
    }
    onMultiChoiceCheckChange(e) {
        this.setState({isCurrentQuestionMultiChoice: e.target.checked});
    }
    onOptionTextChange(e) {
        this.setState({currentOptionText: e.target.value});
    }
    addQuestion(e){
        let correctOptions = this.state.currentOptions.filter(option => option.correct);
        
        if(this.state.currentQuestionText !== "" && this.state.currentOptions.length > 0 && correctOptions.length > 0){
            let question = {};
            let questions = this.state.questions.slice();
            question.text = this.state.currentQuestionText;
            question.answers = this.state.currentOptions;
            question.multichoice = this.state.isCurrentQuestionMultiChoice;
            
            questions.push(question);

            this.setState({currentQuestionText:'', currentOptionText:'', currentOptions : [],questions: questions});

        }
    }
    addOption(e) {
        let correct = this.optionCheckBoxRadio.checked;
        let optionText = this.state.currentOptionText;
        
        if (optionText !== "") {
            
            let options = this.state.currentOptions.slice();
            if(correct && !this.state.isCurrentQuestionMultiChoice){
                options = options.map(option => {
                    option.correct = false;
                    return option;
                });
            }
            let option = {};
            option.text = optionText;
            option.correct = correct;
            options.push(option);
            this.setState({currentOptions: options, currentOptionText: ''});
            this.optionCheckBoxRadio.checked = false;
        }
    }
    onCurrentQuestionTextChange(e) {
        this.setState({currentQuestionText: e.target.value});
    }
    deleteOption(id){
        let options = this.state.currentOptions.slice();
        options.splice(id, 1);
        this.setState({currentOptions: options});
    }
    render() {
        return (
            <div>
                <h2 className="centeredText">Create Quiz</h2>
                <form onSubmit={(e) => this.createQuiz(e)}>
                    <input
                        type="text"
                        placeholder="Quiz Name"
                        className="form-control withMargin"
                        onChange={e => this.onQuizNameChange(e)}
                        required/>
                    <input
                        type="text"
                        placeholder="Quiz Description"
                        className="form-control withMargin"
                        onChange={e => this.onQuizDescChange(e)}
                        required/>
                    <input
                        type="number"
                        placeholder="Time allowed in minutes"
                        className="form-control withMargin"
                        onChange={e => this.onQuizTimeChange(e)}
                        required/>

                    <h2 className="centeredText">
                        <small>Add Questions</small>
                    </h2>
                    <CreateQuestionsList questions={this.state.questions}/>
                    <Panel header={"Question " + (this.state.questions.length + 1)} bsStyle="primary">
                        <input
                            type="text"
                            className="form-control withMargin"
                            placeholder="Question Text"
                            value={this.state.currentQuestionText}
                            onChange={e => this.onCurrentQuestionTextChange(e)}/>
                        <label htmlFor="checkbox">
                            <input
                                type="checkbox"
                                name="checkbox"
                                id="checkbox"
                                className=""
                                checked={this.state.isCurrentQuestionMultiChoice}
                                onChange={(e) => this.onMultiChoiceCheckChange(e)}
                                value="multichoice"/>
                            &nbsp;Multichoice
                        </label>

                        <CreateOptionsList
                            options={this.state.currentOptions}
                            multichoice={this.state.isCurrentQuestionMultiChoice}
                            deleteOption={this.deleteOption}/>

                        <FormGroup>
                            <InputGroup>
                                <InputGroup.Addon>
                                    <input
                                        type={this.state.isCurrentQuestionMultiChoice
                                        ? "checkbox"
                                        : "radio"}
                                        name="option-checkbox"
                                        ref={checkbox_radio => this.optionCheckBoxRadio = checkbox_radio}/>
                                </InputGroup.Addon>
                                <FormControl
                                    type="text"
                                    placeholder="Option text"
                                    value={this.state.currentOptionText}
                                    onChange={e => this.onOptionTextChange(e)}/>
                            </InputGroup>
                        </FormGroup>
                        <input
                            type="button"
                            className="btn btn-default"
                            value="Add Option"
                            onClick={e => this.addOption(e)}/>

                        <div className="centeredText">
                            <input
                                type="button"
                                className="btn btn-primary"
                                value="Add Question"
                                onClick={e => this.addQuestion(e)}/>
                        </div>
                    </Panel>
                    <div className="centeredText">
                        <input type="submit" className="btn btn-default" value="Create Quiz"/>
                    </div>
                </form>
            </div>
        );
    }
}