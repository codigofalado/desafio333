import React, { Component } from 'react';

import Button from "@material-ui/core/Button";
import TextCard from '../TextCard';
import ResultDialog from '../ResultDialog';

import './index.css';

export default class VelLeitura extends Component {
  constructor() {
    super();
    this.state = {
      isTestInit: false,
      open: false,
      minutes: 0,
      seconds: 0,
      numberOfWordsInText: 0,
      resultPPM: 0,
    }
  }

	handleClose() {
    this.setState({
      isTestInit: false,
      open: false,
    });
	}

  startClock() {
    this.myInterval = setInterval(() => {
      const { seconds } = this.state;

      if (seconds >= 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds + 1
      }))
			}

			if (seconds >= 59) {
        this.setState(({ minutes }) => ({
          minutes: minutes + 1,
          seconds: 0
      }))
			}
		}, 1000)
  }

	readStart() {
    this.setState({
      isTestInit: true
    });

    this.startClock();
	}

	readComplete() {
    clearInterval(this.myInterval);
    this.calculatePPM();
    
    this.setState({
      open: true,
      minutes: 0,
      seconds: 0,
    });
  }
  
  calculatePPM() {
    const { seconds, minutes, numberOfWordsInText } = this.state;

    const minutesTotal = minutes + (seconds / 60);
    const ppm = numberOfWordsInText / minutesTotal;
    this.setState({ resultPPM: ppm });
    console.log(numberOfWordsInText);
  }

  render() {
    const { minutes, seconds, isTestInit, open } = this.state;

    return (
      <div className="div-text">
        <div className="div-btn">
            <Button id="btn" href="#div-text" onClick={() => this.readStart()}>
              Começar
            </Button>
        </div>
  
        {isTestInit &&
        <div id="div-text">
          <TextCard onNumberOfWordsInText={(number) => this.setState({ numberOfWordsInText: number })} />
          <div className="div-btn">
            <button id="btn" onClick={() => this.readComplete()}>Terminei</button>
          </div>
        </div>
        }
  
        {open && <ResultDialog onClosed={() => this.handleClose()} open={open} resultPPM={this.state.resultPPM} />}
  
        <span className="span-clock">{ minutes }:{ seconds < 10 ? `0${ Number(seconds) }` : Number(seconds) }</span>
  
      </div>
    );
  }
}