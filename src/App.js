import React, { Component } from 'react';
import quizQuestions from './lib/QuizData';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Start from './components/Start';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      startState:0,
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      correct:0,
      incorrect:0,
      userAnswer:[],
      result: 0
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({
      question: quizQuestions[0].question,
      answerOptions: quizQuestions[0].answers,
      correctAns: quizQuestions[0].correctAns
    });
  }

  handleSubmit(event) {
    this.setState({
      startState: 1
    });
 }
 handleUsername(event) {
   this.setState({
     username: event.currentTarget.value
   });
}

  handleAnswerSelected(event) {
    if(event.currentTarget.value === this.state.correctAns){
      this.setState({
        correct: this.state.correct+1,
        userAnswer:this.state.userAnswer.concat(event.currentTarget.value)
      });
    } else {
      this.setState({
        incorrect: this.state.incorrect+1,
        userAnswer:this.state.userAnswer.concat(event.currentTarget.value)
      });
    }

    if (this.state.questionId < quizQuestions.length) {
        setTimeout(() => this.setNextQuestion(), 300);
    } else {
        setTimeout(() => this.setResults(), 300);
    }
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;

    this.setState({
        counter: counter,
        questionId: questionId,
        question: quizQuestions[counter].question,
        answerOptions: quizQuestions[counter].answers,
        correctAns: quizQuestions[counter].correctAns,
        answer: ''
    });
  }

  setResults(result) {
      this.setState({ result:1 });
  }

  renderQuiz() {
      if(!this.state.startState){
        return(
          <Start username={this.state.username}
            usernameSubmitted={this.handleSubmit}
            usernameValue={this.handleUsername}/>
        );
      } else {
        return(
          <Quiz
            answer={this.state.answer}
            answerOptions={this.state.answerOptions}
            questionId={this.state.questionId}
            question={this.state.question}
            questionTotal={quizQuestions.length}
            onAnswerSelected={this.handleAnswerSelected}
          />
      );
    }
  }

  renderResult() {
    return (
      <Result username={this.state.username}
        correct={this.state.correct}
        incorrect={this.state.incorrect}
        questionData={quizQuestions}
        userAns={this.state.userAnswer} />
    );
  }


  render() {
    return (
      <div className="App">
        <div className="container">
          {this.state.result ? this.renderResult() : this.renderQuiz()}
        </div>
      </div>
    );
  }

}

export default App;
