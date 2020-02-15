import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import './ThemeButton.css';

import {Hat} from './Hat';
import {CardHolder} from './cardHolder';
import {Card} from './Card';
import {ThemeContext} from './themeContext';


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
    const tm = mode ? "D":"L"  
    return (
      <ThemeContext.Provider value={this.state.darkMode}>
        <div>        
         <Hat/>
          <button className={"themeSwitch "+tm} onClick={this.changeMode}> {this.getMode()} </button>
         <CardHolder/>  
       </div>            
      </ThemeContext.Provider>
    );
  }
}

render(<App />, document.getElementById('root'));
