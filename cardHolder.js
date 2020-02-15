import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import './cardHolder.css';
import {Card} from './Card';
import {Streamer} from './streamer';


export class CardHolder extends Component
{
  OverwatchStreams = "https://api.twitch.tv/helix/streams/metadata?game_id=488552";
  GetUsers = "https://api.twitch.tv/helix/users";
  GetStreams = "https://api.twitch.tv/helix/streams";
  fetchData = {
    method: "GET",
    headers: {
      "Client-ID": "mqej6d0kd2emxdfxr3mcvnpyk4r0ya"
    }
  };

  count=2;

  constructor(props)
  {
    super(props);
    let Streamers=[];
    for(let i=0;i<this.count;i++)
      Streamers.push(new Streamer(i));
    this.state=
    {
      streamers : Streamers,
    }    
    this.SetData();
  }

  componentDidMount() {
    this.timerUpd = setInterval(() => this.SetData(),30000);
  }  

  SetData() {    
    console.log("Setup Info");
    let Streamers=[];
    for(let i=0;i<this.count;i++)
      Streamers.push(new Streamer(i));
    let p = new Promise((resolve)=>{
        this.SetOWData(resolve, Streamers);
    })
    p.then(()=>{            
      let request =this.GetUsers + "?id=" + Streamers[0].userId;
      for(let i=1;i<Streamers.length;i++)    
        request+='&id='+Streamers[i].userId; 
      fetch(request, this.fetchData).then(response => response.json()).then(response =>
      {
        const data = response;
        console.log('UsersData');
        console.log(data);
        for(let i=0;i<Streamers.length;i++)
        {          
          Streamers[i].iconURL = data.data[i].profile_image_url;        
        }
      }).then(() => {
        let request =this.GetStreams + "?user_id=" + Streamers[0].userId;
        for(let i=1;i<Streamers.length;i++)    
          request+='&user_id='+Streamers[i].userId;     
        fetch(request, this.fetchData).then(response => response.json()).then(response =>
        {
         const data = response;
         console.log('StreamsData');
          console.log(data);
         for(let i=0;i<Streamers.length;i++)
         {
           let info = data.data[i];
           Streamers[i].language = info.language;
            Streamers[i].title = info.title;
            Streamers[i].viewerCount = info.viewer_count; 
          }
        });    
      }).then(()=>{
        console.log('Установка прошла');
        console.log(Streamers);
        this.setState(
        {
          streamers: Streamers,
        }
      )
      });        
      });    
  }


  //Инфа о трансляции по оверу
  SetOWData(resolve, Streamers ){
    //console.log("Установка OWData");
    fetch(this.OverwatchStreams, this.fetchData).then(response => response.json()).then(response =>
      {
        const data = response;
    console.log(data);
    for(let streamer of Streamers)
    {
    let info =data.data[streamer.index];
    streamer.userId = info.user_id;
    streamer.userName = info.user_name;
    if (info.overwatch != null)
      if (info.overwatch.broadcaster.hero != null) {
        streamer.heroName = info.overwatch.broadcaster.hero.name;
        streamer.heroRole = info.overwatch.broadcaster.hero.role;
      }
    streamer.streamURL = "https://www.twitch.tv/"+streamer.userName;
    }   
   // console.log("Установка OWData прошла");
        resolve();
      }
    );    
  }  
  SetUserData(streamers) {        
    let request =this.GetUsers + "?id=" + streamers[0].userId;
    for(let i=1;i<streamers.length;i++)    
      request+='&id='+streamers[i].userId; 
    fetch(request, this.fetchData).then(response => response.json()).then(response =>
      {
        const data = response;
        console.log('UsersData');
        console.log(data);
        for(let i=0;i<streamers.length;i++)
        {          
          streamers[i].iconURL = data.data[i].profile_image_url;        
        }
      });    
  }
  //Инфа о трансляции по оверу
  SetStreamData(streamers) {      
    let request =this.GetStreams + "?user_id=" + streamers[0].userId;
    for(let i=1;i<streamers.length;i++)    
      request+='&user_id='+streamers[i].userId;     
    fetch(request, this.fetchData).then(response => response.json()).then(response =>
      {
        const data = response;
        console.log('StreamsData');
        console.log(data);
        for(let i=0;i<streamers.length;i++)
        {
          let info = data.data[i];
          streamers[i].language = info.language;
          streamers[i].title = info.title;
          streamers[i].viewerCount = info.viewer_count; 
        }
      });      
  }

  GetStreamer(index)
  {
    return this.Streamers[index];
  }

  getCard= () =>
  {
    let Cards =[];
    for(let i=0;i<this.count;i++)
     Cards.push(<Card key={"Card"+i} darkMode={this.props.darkMode} streamer={this.state.streamers[i]}/>);
    return Cards;
  }

  render()
  {
    const mode=this.props.darkMode ? "D":"L"
    return(
      <div className={"j-c warp holder "+mode}>
      {this.state.streamers.map(streamer => <Card key={"card"+streamer.index} darkMode={this.props.darkMode} streamer={streamer} />)}
      </div>
    );
    
  }
}