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
      time: 0,
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
      const { minutes, seconds } = this.state;

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
    this.setState({
      open: true
    });

    clearInterval(this.myInterval);
	}

  render() {
    const { minutes, seconds, isTestInit, open } = this.state;

    return (
      <div className="div-text">
        <div className="div-btn">
            <Button id="btn" href="#div-text" onClick={() => this.readStart()}>
              Começar
            </Button>
          
          {/* <Button href="#div-text" onClick={() => setIsTestInit(true)}>
            <span>Começar</span>
          </Button> */}
        </div>
  
        {isTestInit &&
        <div id="div-text">
          <TextCard />
          <div className="div-btn">
            <button id="btn" onClick={() => this.readComplete()}>Terminei</button>
          </div>
        </div>
        }
  
        {open && <ResultDialog onClosed={this.handleClose} open={open} />}
  
        <span>{ minutes }:{ seconds < 10 ? `0${ Number(seconds) }` : Number(seconds) }</span>
  
      </div>
    );
  }
}