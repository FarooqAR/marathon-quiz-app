import React, {Component} from 'react';
import OptionsList from './OptionsList';
import Result from './Result';

export default class StartQuiz extends Component{
    constructor(props){
        super(props);
        this.state = {remainingSeconds:'',remainingTime: '',percentage:0, currentQuestionId:0, currentAnswers:[], finished: false};
    }
    componentDidMount(){
        this.quiz = JSON.parse(localStorage.quizzes)[this.props.params.id];
        
        this.setState({remainingSeconds:59 ,remainingTime: parseInt(this.quiz.time,10)});
        let _this = this;
        this.interval = setInterval(function(){
            
            
            
            if(_this.state.remainingTime <= 0 && _this.state.remainingSeconds == 0){
                clearInterval(_this.interval);
                this.showResult();
            }
            else{
                if(_this.state.remainingSeconds <= 0){
                    _this.setState({remainingSeconds: 59, remainingTime: _this.state.remainingTime - 1});
                }
                else{
                    _this.setState({remainingSeconds: _this.state.remainingSeconds - 1});
                }
            }
            
        },1000)
        
    }
    componentWillUnmount(){
        clearInterval(this.interval);
    } 
    onAnswerSubmit(e){
        e.preventDefault();
        let options = e.target.getElementsByClassName('check_box');
        options = Array.prototype.slice.call(options);
        options = options.filter(option => {
            return option.checked;
        });
        options = options.map(option => {
            return option.value
        });
        
        if(options.length > 0){
            let answers= this.state.currentAnswers.slice();
            answers.push(options);
            this.setState({currentAnswers : answers,currentQuestionId : this.state.currentQuestionId + 1});
        }
        if(this.quiz.questions[this.state.currentQuestionId + 1] == undefined){
            this.showResult(); 
        }
        
    }
    showResult(){
        clearInterval(this.interval);
        let answers = this.quiz.questions.map((a)=>{
            return a.answers;
        });
        let correct = 0;
        answers = answers.map((answersForEachQuestion)=>{
            return answersForEachQuestion.filter(answer => {
                return answer.correct;
            });
        });
        answers = answers.map(a =>{
            return a.map(b => b.text);
        });
        

        for(var i = 0, l = this.state.currentAnswers.length; i < l ; i +=1){
            let ans = answers[i];
            let cAns = this.state.currentAnswers[i];
            ans = ans.reduce((a,b)=>{return a.concat(b)},'');
            cAns = cAns.reduce((a,b)=>{return a.concat(b)},'');
            
            if(ans == cAns){
                correct += 1;
            }
        }
        let perc = (correct/answers.length)*100;
        perc = perc.toFixed(2);
        this.setState({percentage: perc,finished: true});
    }
    render(){
        let minutes = this.state.remainingTime < 10 ? '0'+ this.state.remainingTime: this.state.remainingTime;
        let seconds = this.state.remainingSeconds < 10 ? '0' + this.state.remainingSeconds : this.state.remainingSeconds;
        let formattedTime = minutes +":"+ seconds;
        let currentQuestion = this.quiz && this.quiz.questions[this.state.currentQuestionId];
        
        return (
            <div>
                <div className="rightText">{formattedTime}</div>
                <hr/>
                {currentQuestion && <h2>{"Question " + (this.state.currentQuestionId + 1) + ": "}{currentQuestion.text}</h2>}
                <form className="withMargin" onSubmit={(e) => this.onAnswerSubmit(e)}>
                    {currentQuestion && <OptionsList options={currentQuestion.answers} multichoice = {currentQuestion.multichoice}/>}
                    <div className="rightText">
                        {!this.state.finished ? <input type="submit" className="btn btn-primary" value="Next"/> : null}
                    </div>
                    {this.state.finished ? <Result perc={this.state.percentage}/> : null}
                </form>
            </div>
        );
    }
}