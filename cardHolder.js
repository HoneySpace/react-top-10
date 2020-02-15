import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import './cardHolder.css';
import {Card} from './Card';
import {Streamer} from './streamer';
import {ThemeContext} from './themeContext';


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

  count=10;

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
        }).then(()=>{
        console.log('Установка прошла');
        console.log(Streamers);
        this.setState(
        {
          streamers: Streamers,
        });
      });   
      })        
      }).catch(er=>console.log(er));;    
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

  render()
  {
    const mode=this.context ? "D":"L"
    return(
      <div className={"j-c warp holder "+mode}>
      {this.state.streamers.map(streamer => <Card key={"card"+streamer.index} streamer={streamer} />)}
      </div>
    );
    
  }
}

CardHolder.contextType = ThemeContext;