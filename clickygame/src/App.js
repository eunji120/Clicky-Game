import React, { Component } from 'react';
import Matchcard from "./components/Matchcard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import matches from "./matchcards.json";
//import logo from './logo.svg';
import './App.css';

let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Click on an image to earn points. Do not click on the same image more than once!"

class App extends Component {

  //setting this.state.matches to the matches json array
  state = {
    matches,
    correctGuesses,
    bestScore,
    clickMessage
  };

  setClicked = id => {

    //setting variables
    const matches = this.state.matches;
    const clickedMatch = matches.filter(match => match.id === id);

    //if the matched img's clicked value is already true, do the game over actions
    if (clickedMatch[0].clicked) {

      console.log("Correct Guesses: " + correctGuesses);
      console.log("Best Score: " + bestScore);

      correctGuesses = 0;
      clickMessage = "Start over"

      for (let i = 0; i < matches.length; i++) {
        matches[i].clicked = false;
      }

      this.setState({clickMessage});
      this.setState({correctGuesses});
      this.setState({matches});

      // if clicked = false, and the user hasn't completed
    } else if (correctGuesses < 11) {

      clickedMatch[0].clicked = true;
      correctGuesses++;
      clickMessage = "Keep going!"

      if (correctGuesses > bestScore) {
        bestScore = correctGuesses;
        this.setState({bestScore});
      }

      //shuffling the array to be shown in a random order
      matches.sort(function(a, b) {
        return 0.5 - Math.random()
      });

      this.setState({matches});
      this.setState({correctGuesses});
      this.setState({clickMessage});

      //if the player selected different images 12 times
    } else {

      clickedMatch[0].clicked = true;
      correctGuesses= 0;
      clickMessage = "Great work!"
      bestScore = 12;
      this.setState({bestScore});

      for (let i = 0; i < matches.length; i++) {
        matches[i].clicked = false;
      }

      matches.sort(function(a, b) {
        return 0.5 - Math.random()
      });

      this.setState({matches});
      this.setState({correctGuesses});
      this.setState({clickMessage});
    }
  };

  render() {
    return (
      <Wrapper>
        <Title></Title>
        <h3 className="scoreSummary">
        {this.state.clickMessage}
        </h3>

        <h3 className="scoreSummary">
        Correct Guesses: {this.state.correctGuesses}
        <br />
        Best Score: {this.state.bestScore}
        </h3>

        {this.state.matches.map(match => (
          <Matchcard
            setClicked={this.setClicked}
            id={match.id}
            key={match.id}
            image={match.image}
            />
        ))}
      </Wrapper>
    );
  }
}

export default App;
