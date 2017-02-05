import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import App from './App';
import Create from './components/Create';
import Quizzes from './components/Quizzes';
import Quiz from './components/Quiz';
import StartQuiz from './components/StartQuiz';
import SignIn from './components/SignIn';
import Index from './components/Index';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index}/>
      <Route path="/create" component={Create}/>
      <Route path="/quizzes" component={Quizzes}/>
      <Route path="/signin" component={SignIn}/>
      <Route path="/quiz/:id" component={Quiz}/>
      <Route path="/start/:id" component={StartQuiz}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
