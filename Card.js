import React, { Component } from 'react';
import { render } from 'react-dom';
import {Streamer} from './streamer';
import './style.css';
import './card.css';

export class Card extends Component
{
  constructor(props)
  {
    super(props);        
  }

  heroPlaceholder = () => 
  {
    const textMode =(this.props.darkMode ? "D":"L")+"Text";
    return(
      <p className={"info left "+textMode}>
        Hero not choosen
      </p>
    );         
  }

  hero = () =>
  {
    const textMode =(this.props.darkMode ? "D":"L")+"Text";
    return(
      <div className="j-c">
        <p className={"left "+textMode}>
          Hero: {this.props.streamer.heroName}
        </p>
        <p className={"left "+textMode}>
          Role: {this.props.streamer.heroRole}
        </p>
      </div> 
    );
  }

  componentWillUpdate()
  {
    console.log('before');

    const streamer = this.props.streamer;      
    console.log(streamer.language);
    console.log(streamer); 
  }
  render()
  {    
    console.log("render: streamer "+this.props.streamer.index);      
    const streamer = this.props.streamer;      
    console.log(streamer.language);
    console.log(streamer);      
    const mode =this.props.darkMode ? "D":"L"
    const textMode =(this.props.darkMode ? "D":"L")+"Text";
    const Title = this.props.streamer.title ? this.props.streamer.title :"Stream Title";
    const limg = this.props.streamer.iconURL ? this.props.streamer.iconURL :"https://cs-rulit.ru/files/avatars/1548584003.jpg";
    const name = this.props.streamer.userName ? this.props.streamer.userName :"Name: Loading..."
    const viewers = this.props.streamer.viewerCount ? this.props.streamer.viewerCount :"Loading..."
    const lang = this.props.streamer.language ? this.props.streamer.language :"Loading..."
    return(
      <div className={"card "+mode}>
        <h1 className={"title center "+textMode}>
        {Title}
        </h1>     
        <img className="logo center" src={limg}/>
        <div className="flex-container mt10">
          <p className={"left name "+textMode}>
            {name}
          </p>
          <button onClick ={(e) =>{ e.preventDefault(); window.open(this.props.streamer.streamURL,"_self")}} className={"right btn "+textMode+" "+mode}>
            Watch
          </button>          
        </div>
        <div className="info left">
          <p className={"info left "+textMode}>
            Viewers: {viewers}
          </p>
          <p className={"info left "+textMode}>
            Language: {lang}
          </p>                   
          {this.props.streamer.heroName !=null ? this.hero(): this.heroPlaceholder()}               
        </div>
      </div>
    );
    
  }
}