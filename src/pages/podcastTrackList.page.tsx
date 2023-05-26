import PodcastDetail from '../layout/PodcastDetail';
import useFetchHook from "../hooks/useFetch.hook";
import '../pages/styles/podcastDetail.sass'
import { podcastProps } from '../component/main/podcast.component';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

//Description : Summary -> label
interface episodes { trackName:string , releaseDate:Date , trackTimeMillis:number }
interface podcastInDetail {
    pic:string,
    name:string,
    artist:string,
    description:string,
    episodes:episodes[]
}

//https://itunes.apple.com/lookup?id=1535809341&media=podcast&entity=podcastEpisode
const PodcastTrackList = () => {

    const { podcastid } = useParams();
    const nav = useNavigate() ; const { pathname } = useLocation()

    const { data , isLoading } = useFetchHook({
        route:`https://itunes.apple.com/lookup?id=${podcastid}&media=podcast&entity=podcastEpisode`,
        flag:'podcast'
    });

    const msParser = (ms: number): string => {
        const totalSeconds = Math.floor(ms / 1000);
        const seconds = totalSeconds % 60;
        const totalMinutes = Math.floor(totalSeconds / 60);
        const minutes = totalMinutes % 60;
        const hours = Math.floor(totalMinutes / 60);
        const toStringandAdd0 = (value:number) => (value <= 9) ? `0${value}` : value
        return `${toStringandAdd0(hours)} : ${toStringandAdd0(minutes)} : ${toStringandAdd0(seconds)}`;
    }

    const onClickCallback = () => nav(`${pathname}/episode/lorem`);

    return(
        (data)
        ?
        <PodcastDetail>
            <div className="episodesList">
                <div className="episodesCount">Episodes : {data.length}</div>
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
                        {data.map( (x:episodes,i:number) => 
                        (
                            <tr key={i}>
                                <th><a href="" onClick={onClickCallback}>{x.trackName}</a></th>
                                <td>{`${x.releaseDate.getDay()} / ${x.releaseDate.getMonth()} / ${x.releaseDate.getFullYear()}`}</td>
                                <td style={{textAlign:'center'}}>{msParser(x.trackTimeMillis)}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </PodcastDetail>
        :<></>
    )
    
}

export { PodcastTrackList }