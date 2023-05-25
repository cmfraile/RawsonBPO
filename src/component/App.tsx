import { useState } from "react";
import { Main , Detail , Podcast } from "../pages";

type appNavigate = 'main'|'podcastDetail'|'episodeDetail';
const App = () => {

  const [ navigate , setNavigate ] = useState<appNavigate>('main');

  const Render = () => {
    switch(navigate){
      case 'main' : return <Main/> ;
      case 'episodeDetail' : return <Detail/> ;
      case 'podcastDetail' : return <Podcast/> ;
      default : return <></> ;
    }
  }

  return (
    <div className="container">
      {Render()}
    </div>
  )

}

export default App