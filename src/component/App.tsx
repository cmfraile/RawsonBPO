import { useContext, useState } from "react";
import { Track , Main , PodcastTrackList } from "../pages";
import { appNavigate, mainContext } from "../context/mainContext";


const App = () => {

  const { navigate } = useContext<{navigate:appNavigate}>(mainContext);

  const Render = () => {
    switch(navigate){
      case 'main' : return <Main/> ;
      case 'Track' : return <Track/> ;
      case 'podcastTrackList' : return <PodcastTrackList/> ;
      default : return <></> ;
    }
  }

  return <div className="container">{Render()}</div> 

}

export default App