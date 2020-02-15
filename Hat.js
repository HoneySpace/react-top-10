import React, { Component } from 'react';
import { render } from 'react-dom';
import {ThemeContext} from './themeContext';

import './style.css';

export class Hat extends Component
{  

  lightLink="https://www.dropbox.com/s/aw8070xukkqafzb/Light.png?dl=1"
  darkLink="https://www.dropbox.com/s/358yl17nwcu8493/Dark.png?dl=1"
  
  
  constructor(props)
  {
    super(props);    
  }  

  render()
  {    
    const divClass= this.context ? "D" : "L";
    const limg = this.context ? this.darkLink : this.lightLink;
    const hClass= this.context ? "DText" : "LText";
    return(           
      <div className={"j-c hat "+divClass}>   
            <img className="icon" src={limg} />             
            <h1 className={"Title "+hClass}>
              TOP-10 Overwatch streams
            </h1>
      </div>          
    );    
  }
}

Hat.contextType = ThemeContext;
