import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import {Hat} from './Hat';
import {CardHolder} from './cardHolder';
import {Card} from './Card';

class App extends Component {

  
  constructor() {
    super();
    this.state = {
      name: 'React',
      darkMode : true,
    };
  }

  getMode = () =>
  {
    if(this.state.darkMode) return "Dark";
    else return "Ligth";
  }

  changeMode = () =>
  {    
    this.setState({
    darkMode: !this.state.darkMode,
    });
  }

  render() { 
    const mode= this.state.darkMode;  
    return (
      <div>        
        <Hat darkMode={mode}/>
        <button className="Mode" onClick={this.changeMode}> {this.getMode()} </button>
        <CardHolder darkMode={mode}/>  
      </div>            
    );
  }
}

render(<App />, document.getElementById('root'));
