import PodcastDetail from '../layout/PodcastDetail';
import useFetchHook from "../hooks/useFetch.hook";
import '../pages/styles/podcastDetail.sass'
import { podcastProps } from '../component/main/podcast.component';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

//Description : Summary -> label
interface episodes { name:string , link:string , date:Date , duration:string }
interface podcastInDetail {
    pic:string,
    name:string,
    artist:string,
    description:string,
    episodes:episodes[]
}
const episodesPlaceholder = ():episodes[] => {
    const array:episodes[] = [] ;
    for(let i = 0 ; i <= 10 ; i++){
        array.push(
            {
                name:'Lorem Ipsum',
                link:'http://google.es',
                date:new Date(),
                duration:'20:00'
            }
        )
    };
    return array;
}

//https://itunes.apple.com/lookup?id=1535809341&media=podcast&entity=podcastEpisode
const PodcastTrackList = () => {
    
    const episodes = episodesPlaceholder();

    /*const { data , isLoading } = useFetchHook({
        route:`https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode`,
        flag:'podcast'
    })*/


    return(
        <PodcastDetail>
            <div className="episodesList">
                <div className="episodesCount">Episodes : {episodes.length}</div>
                <div className="tableSquare">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className="col-8">Title</th>
                            <th className="col">Date</th>
                            <th className="col" style={{textAlign:'center'}}>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {episodes.map( (x,i) => 
                        (
                            <tr key={i}>
                                <th><a href={x.link}>{x.name}</a></th>
                                <td>{`${x.date.getDay()} / ${x.date.getMonth()} / ${x.date.getFullYear()}`}</td>
                                <td style={{textAlign:'center'}}>{x.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </PodcastDetail>
    )
    
}

export { PodcastTrackList }