import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state={
      counter:0,
      belowZeroClick: false
    }
  }

  counterIncrement = () => {
    let newState = {...this.state};
    if (newState.counter === 0 && newState.belowZeroClick){
      newState.belowZeroClick = false;
    } 
    newState.counter = newState.counter + 1;
    this.setState(newState)
  }

  counterDecrement = () => {
    let newState = { ...this.state };
    if(newState.counter > 0){
      newState.counter = newState.counter - 1;
    }

    if(newState.counter === 0){
      newState.belowZeroClick = true;
    }

    this.setState(newState)
  }

  render(){
    return (
        <div data-test="App" className = "App" >
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p data-test="counter-display">
              You have clicked {this.state.counter} times
            </p>
            <br/>
            {
              this.state.belowZeroClick 
              ? <p data-test="error-txt" style={{ color: "red" }}>the counter cannot go below zero</p> 
              : ''
            }
            <br />
            <button data-test="increment-btn" onClick={this.counterIncrement}>
              Increase
            </button>
            <button data-test="decrement-btn" onClick={this.counterDecrement}>
              Decrease
            </button>
          </header>
        </div>
    )
  }
  
  
}

export default App;
