import { useContext, useState } from "react";
import { Main , Detail , PodcastDetail } from "../pages";
import { appNavigate, mainContext } from "../context/mainContext";


const App = () => {

  const { navigate } = useContext<{navigate:appNavigate}>(mainContext);

  const Render = () => {
    switch(navigate){
      case 'main' : return <Main/> ;
      case 'episodeDetail' : return <Detail/> ;
      case 'podcastDetail' : return <PodcastDetail/> ;
      default : return <></> ;
    }
  }

  return <div className="container">{Render()}</div> 

}

export default App